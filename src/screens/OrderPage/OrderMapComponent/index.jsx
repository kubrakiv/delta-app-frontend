import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useJsApiLoader, DirectionsService } from "@react-google-maps/api";
import Map from "../../../components/Map";
import { formatDuration } from "../../../utils/formatDuration";

const { REACT_APP_API_KEY: API_KEY } = process.env;

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
        const origin = {
            lat: parseFloat(
                tasks?.length > 0 && tasks[0].point_details.gps_latitude
            ),
            lng: parseFloat(
                tasks?.length > 0 && tasks[0].point_details.gps_longitude
            ),
        };

        const destination = {
            lat: parseFloat(
                tasks?.length > 0 &&
                    tasks[tasks?.length - 1].point_details.gps_latitude
            ),
            lng: parseFloat(
                tasks?.length > 0 &&
                    tasks[tasks?.length - 1].point_details.gps_longitude
            ),
        };

        const waypoints =
            tasks &&
            tasks.slice(1, -1).map((task) => ({
                location: {
                    lat: parseFloat(
                        tasks?.length > 0 && task.point_details.gps_latitude
                    ),
                    lng: parseFloat(
                        tasks?.length > 0 && task.point_details.gps_longitude
                    ),
                },
                stopover: true,
            }));

        return {
            origin,
            destination,
            travelMode: "DRIVING",
            waypoints,
        };
    }, [tasks]);

    const directionsCallback = useCallback(
        (response) => {
            if (response !== null) {
                if (response.status === "OK") {
                    setDirectionsResponse(response);

                    const totalDistanceMeters = response.routes[0].legs.reduce(
                        (total, leg) => total + leg.distance.value,
                        0
                    );

                    const totalDistanceKm =
                        (totalDistanceMeters / 1000).toFixed(0) + " km";

                    setDistance(totalDistanceKm);

                    const totalDurationSeconds = response.routes[0].legs.reduce(
                        (total, leg) => total + leg.duration.value,
                        0
                    );

                    const totalDurationFormatted =
                        formatDuration(totalDurationSeconds);

                    setDuration(totalDurationFormatted);
                } else {
                    console.log("response: ", response);
                }
            }
        },
        [setDirectionsResponse, setDistance, setDuration]
    );

    return (
        <div className="order-details__content-row">
            <div className="order-details__content-row-block order-details__content-row-block-map">
                {isLoaded ? (
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
