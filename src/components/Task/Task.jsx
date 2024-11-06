import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FaPencilAlt,
  FaRegCheckCircle,
  FaRegClock,
  FaRegTrashAlt,
  FaRoute,
} from "react-icons/fa";

import { selectSwitchers } from "../../features/planner/plannerSelectors";

import { DELIVERY_CONSTANTS } from "../../constants/global";
const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

import "./Task.scss";

function Task({
  task,
  handleEndTime,
  handleStartTime,
  handleDeleteTask,
  handleEditModeTask,
}) {
  const { showDriver, showOrderNumber, showCustomer } =
    useSelector(selectSwitchers);

  const [isHovered, setHovered] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [unloadingStatus, setUnloadingStatus] = useState(false);

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
            <div className="task__time">{task.start_time.substring(0, 5)}</div>
          </>
        ) : (
          <>
            <div className="task__time">{task.end_time.substring(0, 5)}</div>
          </>
        );
      case UNLOADING:
        return !unloadingStatus ? (
          <>
            <div className="task__time">{task.start_time.substring(0, 5)}</div>
          </>
        ) : (
          <>
            <div className="task__time">{task.end_time.substring(0, 5)}</div>
          </>
        );
      case "Service":
        return !loadingStatus ? (
          <>
            <div className="task__time">{task.start_time.substring(0, 5)}</div>
          </>
        ) : (
          <>
            <div className="task__time">{task.end_time.substring(0, 5)}</div>
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
                <Link to={`/orders/${task.order_id}`}>
                  <button
                    type="button"
                    title="Перейти в маршрут"
                    className="task-actions_first"
                  >
                    <FaRoute />
                  </button>
                </Link>
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
            {/* <div className="task__title">
              <span>
                {task.point_details?.country_short}-
                {task.point_details?.postal_code} {task.point_details?.city}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
