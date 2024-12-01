import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaPencilAlt,
  FaRegCheckCircle,
  FaRegClock,
  FaRegTrashAlt,
  FaRoute,
} from "react-icons/fa";

import {
  selectShowTruckOnMapModal,
  selectSwitchers,
} from "../../features/planner/plannerSelectors";

import { DELIVERY_CONSTANTS } from "../../constants/global";
const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

import "./Task.scss";
import { setShowTruckOnMapModal } from "../../features/planner/plannerSlice";
import { listOrderDetails } from "../../actions/orderActions";
import { selectTrucks } from "../../features/trucks/trucksSelectors";
import { getTruckLocation } from "../../services/truckLocationService";
import { setTruckDetails } from "../../actions/mapActions";

function Task({
  task,
  handleEndTime,
  handleStartTime,
  handleDeleteTask,
  handleEditModeTask,
}) {
  const dispatch = useDispatch();

  const showTruckOnMapModal = useSelector(selectShowTruckOnMapModal);
  const trucks = useSelector(selectTrucks);
  const { showDriver, showOrderNumber, showCustomer } =
    useSelector(selectSwitchers);

  const [isHovered, setHovered] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [unloadingStatus, setUnloadingStatus] = useState(false);

  // Set loading and unloading statuses
  useEffect(() => {
    // Function to set loading and unloading statuses
    const setStatus = () => {
      if (task.type === LOADING) {
        if (task.end_date && task.end_time) {
          setLoadingStatus(true);
        } else {
          setLoadingStatus(false);
        }
      } else if (task.type === UNLOADING) {
        if (task.end_date && task.end_time) {
          setUnloadingStatus(true);
        } else {
          setUnloadingStatus(false);
        }
      }
    };
    setStatus();
  }, [task]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Fetch truck details and location
  // useEffect(() => {
  //   if (task?.truck) {
  //     const truck = trucks.find((t) => t.plates === task.truck);
  //     dispatch(setTruckDetails(truck));
  //     if (truck) {
  //       if (truck.gps_id) {
  //         // Only attempt to fetch truck location if gps_id is present
  //         getTruckLocation(truck, dispatch).catch((error) => {
  //           console.error("Failed to fetch truck location:", error);
  //         });
  //       } else {
  //         // No gps_id, set truck location as not loaded
  //         console.log("Truck found, but no gps_id available");
  //       }
  //     } else {
  //       // Truck not found in the list
  //       console.log("Truck not found in the list");
  //     }
  //   } else {
  //     // No truck assigned to the order
  //     console.log("No truck assigned to the task");
  //   }
  // }, [task, trucks, dispatch]);

  // const handleShowTruckOnMap = (e) => {
  //   e.stopPropagation();
  //   console.log("Show truck on map");
  //   dispatch(setShowTruckOnMapModal(true));
  //   dispatch(listOrderDetails(task.order_id));
  // };

  const handleShowTruckOnMap = (e) => {
    e.stopPropagation();

    console.log("Show truck on map");
    dispatch(setShowTruckOnMapModal(true));
    dispatch(listOrderDetails(task.order_id));

    if (task?.truck) {
      const truck = trucks.find((t) => t.plates === task.truck);
      dispatch(setTruckDetails(truck));

      if (truck && truck.gps_id) {
        getTruckLocation(truck, dispatch).catch((error) => {
          console.error("Failed to fetch truck location:", error);
        });
      } else {
        console.log(
          truck
            ? "Truck found, but no gps_id available"
            : "Truck not found in the list"
        );
      }
    } else {
      console.log("No truck assigned to the task");
    }
  };

  const getTaskColor = (taskType, endDate, endTime) => {
    switch (taskType) {
      case LOADING:
        if (!endDate || !endTime) {
          return "rgb(255, 255, 0)"; //yellow color
        } else {
          return "rgba(0, 0, 255, 0.8)"; //blue color
        }

      case UNLOADING:
        if (!endDate || !endTime) {
          return "rgb(255, 0, 255)"; //pink color
        } else {
          return "rgba(0, 255, 0, 0.8)"; //green color
        }
      case "Service":
        return "red"; //red color
      case "Driving":
        return "rgba(255, 165, 0, 0.8)"; //orange color
      default:
        return "rgba(140, 177, 186, 0.3)"; //grey color
    }
  };

  const getTextColor = (taskType, endDate, endTime) => {
    switch (taskType) {
      case LOADING:
        if (!endDate || !endTime) {
          return "black";
        } else {
          return "white";
        }
      case UNLOADING:
        return "black";
      // case "Ремонт":
      // return "white";
      default:
        return "black";
    }
  };

  const getTimeComponent = (taskType, endDate, endTime) => {
    switch (taskType) {
      case LOADING:
        return !loadingStatus ? (
          <>
            <div className="task__time">
              {task?.start_time?.substring(0, 5)}
            </div>
          </>
        ) : (
          <>
            <div className="task__time">{task?.end_time?.substring(0, 5)}</div>
          </>
        );
      case UNLOADING:
        return !unloadingStatus ? (
          <>
            <div className="task__time">
              {task?.start_time?.substring(0, 5)}
            </div>
          </>
        ) : (
          <>
            <div className="task__time">{task?.end_time?.substring(0, 5)}</div>
          </>
        );
      case "Service":
        return !loadingStatus ? (
          <>
            <div className="task__time">
              {task?.start_time?.substring(0, 5)}
            </div>
          </>
        ) : (
          <>
            <div className="task__time">{task?.end_time?.substring(0, 5)}</div>
          </>
        );
      default:
        return null;
    }
  };

  const taskStyle = {
    backgroundColor: getTaskColor(task.type, task.end_date, task.end_time),
  };

  const textStyle = {
    color: getTextColor(task.type, task.end_date, task.end_time),
  };

  return (
    <>
      <div className="task__container">
        <div
          className="task"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={taskStyle}
        >
          {isHovered && (
            <div className="task-actions">
              {task.type === LOADING || task.type === UNLOADING ? (
                <>
                  <Link to={`/orders/${task.order_id}`}>
                    <button
                      type="button"
                      title="Перейти в маршрут"
                      className="task-actions_first"
                    >
                      <FaRoute />
                    </button>
                  </Link>
                  <button
                    type="button"
                    title="Показати авто"
                    className="task-actions_map"
                    onClick={(e) => handleShowTruckOnMap(e)}
                  >
                    <FaMapMarkerAlt />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  title="Видалити завдання"
                  className="task-actions_delete"
                  onClick={(e) => handleDeleteTask(e, task.id)}
                >
                  <FaRegTrashAlt />
                </button>
              )}
              {task.type === "Service" || task.type === "Driving" ? (
                <button
                  type="button"
                  title="Редагувати"
                  className="task-actions_edit"
                  onClick={(e) => handleEditModeTask(e, task)}
                >
                  <FaPencilAlt />
                </button>
              ) : null}

              <button
                type="button"
                title="Початок"
                className="task-actions_second"
                onClick={() => handleStartTime(task)}
              >
                <FaRegClock />
              </button>
              <button
                type="button"
                title="Завершено"
                className="task-actions_third"
                onClick={() => handleEndTime(task)}
              >
                <FaRegCheckCircle />
              </button>
            </div>
          )}
          <div className="task-details" style={textStyle}>
            {showOrderNumber && (
              <div className="task-details__order">{task.order_number}</div>
            )}
            {showDriver && (
              <div className="task-details__driver">{task.driver}</div>
            )}
            {showCustomer && (
              <div className="task-details__customer">{task.customer}</div>
            )}
            <span>
              {getTimeComponent(task.type, task.end_date, task.end_time)}
            </span>
            <div className="task__title">
              <span>{task.title}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
