import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useJsApiLoader, DirectionsService } from "@react-google-maps/api";
import Map from "../../../components/Map";
import { formatDuration } from "../../../utils/formatDuration";

const { REACT_APP_API_KEY: API_KEY } = import.meta.env;

const OrderMapComponent = () => {
  const map = useSelector((state) => state.map);
  const order = useSelector((state) => state.ordersInfo.order.data);
  const tasks = useSelector((state) => state.ordersInfo.order.data.tasks);
  const defaultCenter = useSelector((state) => state.map.defaultCenter);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    setDistance(order.distance);
  }, [order]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: map.libraries,
  });

  const directionsServiceOptions = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return null;
    }

    const origin = {
      lat: parseFloat(tasks[0].point_details.gps_latitude || 0),
      lng: parseFloat(tasks[0].point_details.gps_longitude || 0),
    };

    const destination = {
      lat: parseFloat(tasks[tasks?.length - 1].point_details.gps_latitude || 0),
      lng: parseFloat(
        tasks[tasks?.length - 1].point_details.gps_longitude || 0
      ),
    };

    const waypoints =
      tasks &&
      tasks.slice(1, -1).map((task) => ({
        location: {
          lat: parseFloat(task.point_details.gps_latitude || 0),
          lng: parseFloat(task.point_details.gps_longitude || 0),
        },
        stopover: true,
      }));

    // Function to determine if Switzerland should be avoided
    const shouldAvoidSwitzerland = (lat, lng) => {
      // Rough latitude and longitude bounds for Italy
      const italyBounds = {
        latMin: 36.0,
        latMax: 47.0,
        lngMin: 6.0,
        lngMax: 18.0,
      };

      // Check if the coordinates fall within Italy's bounds
      if (
        lat >= italyBounds.latMin &&
        lat <= italyBounds.latMax &&
        lng >= italyBounds.lngMin &&
        lng <= italyBounds.lngMax
      ) {
        return true; // Italy detected, avoid Switzerland
      }

      return false; // Otherwise, don't need to avoid Switzerland
    };

    // Determine if either the origin or destination requires avoiding Switzerland
    const avoidSwitzerland =
      shouldAvoidSwitzerland(origin.lat, origin.lng) ||
      shouldAvoidSwitzerland(destination.lat, destination.lng);

    // Define waypoints to help avoid Switzerland if needed
    const avoidSwitzerlandWaypoints = avoidSwitzerland
      ? [
          {
            location: { lat: 45.99732650852601, lng: 11.120364378056005 }, // Near Innsbruck, Austria - guiding through Austria
            stopover: false,
          },
          {
            location: { lat: 47.005185080619526, lng: 11.508408026490219 }, // Near Innsbruck, Austria - guiding through Austria
            stopover: false,
          },
        ]
      : [];

    // Combine existing waypoints and avoidance waypoints
    const combinedWaypoints = waypoints
      ? [...avoidSwitzerlandWaypoints, ...waypoints]
      : avoidSwitzerlandWaypoints;

    return {
      origin,
      destination,
      travelMode: "DRIVING",
      waypoints: combinedWaypoints,
    };
  }, [tasks]);

  const directionsCallback = useCallback(
    (response) => {
      if (response !== null) {
        if (response.status === "OK") {
          setDirectionsResponse(response);
        } else {
          console.log("response: ", response);
        }
      }
    },
    [setDirectionsResponse]
  );

  return (
    <div className="order-details__content-row">
      <div className="order-details__content-row-block order-details__content-row-block-map">
        {isLoaded && directionsServiceOptions ? (
          <>
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
            <Map
              tasks={tasks}
              center={defaultCenter}
              directionsResponse={directionsResponse}
            />
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default OrderMapComponent;
