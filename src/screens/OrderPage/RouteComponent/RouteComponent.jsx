import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalculator } from "react-icons/fa";
import { listOrderDetails, updateOrder } from "../../../actions/orderActions";

import "./RouteComponent.scss";

const RouteComponent = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.ordersInfo.order.data);
  const tasks = useSelector((state) => state.ordersInfo.order.data.tasks);

  const [distance, setDistance] = useState(null);
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  async function calculateRoute(origin, destination) {
    try {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: origin,
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      return results.routes[0].legs[0].distance.value; // distance in meters
    } catch (error) {
      console.error("Error calculating route: ", error);
      return 0;
    }
  }

  const calculateDistance = async () => {
    if (tasks.length < 2) return;

    let totalDistance = 0;
    for (let i = 0; i < tasks.length - 1; i++) {
      const origin = {
        lat: parseFloat(tasks[i].point_details.gps_latitude),
        lng: parseFloat(tasks[i].point_details.gps_longitude),
      };

      const destination = {
        lat: parseFloat(tasks[i + 1].point_details.gps_latitude),
        lng: parseFloat(tasks[i + 1].point_details.gps_longitude),
      };

      const distanceBetweenPoints = await calculateRoute(origin, destination);
      totalDistance += distanceBetweenPoints;
    }

    const distanceInKm = (totalDistance / 1000).toFixed();
    setDistance(distanceInKm);

    const dataToUpdate = { distance: parseFloat(distanceInKm) };
    await dispatch(updateOrder(dataToUpdate, order.id));

    // Fetch new order details to refresh data
    dispatch(listOrderDetails(order.id));
  };

  return (
    <>
      {order && (
        <div
          className="order-details__route"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="order-details__route_title">Маршрут</div>
          <div className="order-details__route_distance">
            Відстань: {distance ? distance : order.distance} км
          </div>
          {isHovered && (
            <button
              type="button"
              title="Порахувати відстань"
              className="order-details__route_calc-btn"
              onClick={calculateDistance}
            >
              <FaCalculator />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default RouteComponent;
