import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalculator } from "react-icons/fa";
import { listOrderDetails, updateOrder } from "../../../actions/orderActions";
import { calculateTotalDistance } from "../../../services/distanceCalculationService";

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

  const calculateDistance = async () => {
    if (tasks.length < 2) return;

    const totalDistance = await calculateTotalDistance(tasks);

    setDistance(totalDistance);

    const dataToUpdate = { distance: parseFloat(totalDistance) };
    await dispatch(updateOrder(dataToUpdate, order.id));

    // Fetch new order details to refresh data
    dispatch(listOrderDetails(order.id));
  };

  return (
    <>
      {order && (
        <div
          className="order-details__route mb-5"
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
