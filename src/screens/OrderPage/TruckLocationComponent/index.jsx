import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { calculateRouteDistance } from "../../../services/distanceCalculationService";

import { DELIVERY_CONSTANTS } from "../../../constants/global";
const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

const TruckLocationComponent = ({ style }) => {
  const [remainingDistance, setRemainingDistance] = useState(null);
  const [pendingTask, setPendingTask] = useState(null);

  const tasks = useSelector((state) => state.ordersInfo.order.data.tasks);
  const truckLocation = useSelector((state) => state.map.truckLocation);

  // Determine if the order is finished
  const isOrderFinished = tasks?.every(
    (task) =>
      (task.type === LOADING || task.type === UNLOADING) &&
      task.end_date &&
      task.end_time
  );

  useEffect(() => {
    if (isOrderFinished) {
      setRemainingDistance(null);
      return;
    }

    const calculateRemainingDistance = async () => {
      if (!truckLocation || !tasks || tasks.length === 0) {
        setRemainingDistance(null);
        return;
      }

      // Find the first task where loading or unloading is not complete
      const pendingTask = tasks.find(
        (task) =>
          (task.type === LOADING && !(task.end_date && task.end_time)) ||
          (task.type === UNLOADING && !(task.end_date && task.end_time))
      );
      setPendingTask(pendingTask);

      if (!pendingTask) {
        setRemainingDistance(null);
        return;
      }

      // Set destination to the found task's point details
      const destination = {
        lat: parseFloat(pendingTask.point_details.gps_latitude),
        lng: parseFloat(pendingTask.point_details.gps_longitude),
      };

      // Calculate the distance using the service
      const distance = await calculateRouteDistance(truckLocation, destination);
      setRemainingDistance((distance / 1000).toFixed(0)); // Convert to km and round to 2 decimal places
    };

    calculateRemainingDistance();
  }, [truckLocation, tasks, isOrderFinished]);

  // Render the component only if the order is not finished
  if (isOrderFinished) {
    return null;
  }

  console.log("Pending task", pendingTask);

  return (
    <>
      <div className={`order-details__content-row ${style}`}>
        <div className="order-details__content-row-block">
          <div className="order-details__route">
            <div className="order-details__route_title">
              Місцезнаходження авто
            </div>
            <div className="order-details__route_distance">
              Відстань:{" "}
              {remainingDistance !== null
                ? `${remainingDistance} км до пункту ${pendingTask?.title}`
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TruckLocationComponent;
