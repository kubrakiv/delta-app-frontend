import React, { useEffect, useState } from "react";
import "./TaskOrder.scss";
import {
    FaCalendar,
    FaClock,
    FaMapMarkerAlt,
    FaPencilAlt,
    FaRegTrashAlt,
} from "react-icons/fa";
import {
    PiArrowFatDownBold,
    PiArrowFatUpBold,
    PiArrowFatDownFill,
    PiArrowFatUpFill,
} from "react-icons/pi";
import { formattedTime } from "../../utils/formattedTime";
import { DELIVERY_CONSTANTS } from "../../constants/global";
const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

function TaskOrder({
    task,
    handleShowPointOnMap,
    handleEditModeTask,
    handleDeleteTask,
}) {
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

    const getIconComponent = () => {
        switch (task.type) {
            case LOADING:
                return loadingStatus ? (
                    <PiArrowFatDownFill style={iconStyle} />
                ) : (
                    <PiArrowFatDownBold style={iconStyle} />
                );
            case UNLOADING:
                return unloadingStatus ? (
                    <PiArrowFatUpFill style={iconStyle} />
                ) : (
                    <PiArrowFatUpBold style={iconStyle} />
                );
            default:
                return null;
        }
    };

    const getTimeComponent = () => {
        switch (task.type) {
            case LOADING:
                return !loadingStatus ? (
                    <>
                        <div className="task-order__date">
                            <FaCalendar /> {task.start_date}
                        </div>
                        <div className="task-order__time">
                            <FaClock /> {formattedTime(task.start_time)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="task-order__date">
                            <FaCalendar /> {task.end_date}
                        </div>
                        <div className="task-order__time">
                            <FaClock /> {formattedTime(task.end_time)}
                        </div>
                    </>
                );
            case UNLOADING:
                return !unloadingStatus ? (
                    <>
                        <div className="task-order__date">
                            <FaCalendar /> {task.start_date}
                        </div>
                        <div className="task-order__time">
                            <FaClock /> {formattedTime(task.start_time)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="task-order__date">
                            <FaCalendar /> {task.end_date}
                        </div>
                        <div className="task-order__time">
                            <FaClock /> {formattedTime(task.end_time)}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const iconStyle = {
        color: task.type === LOADING ? "green" : "red",
    };

    const taskStyle = {
        backgroundColor: isHovered
            ? task.type === LOADING
                ? "rgba(63, 177, 40, 0.6)"
                : "rgba(226, 97, 85, 0.6)"
            : "rgba(140, 177, 186, 0.3)",
    };

    return (
        <>
            {task && (
                <div
                    className="task-order"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={taskStyle}
                >
                    <div className="task-order__icon">{getIconComponent()}</div>
                    <div className="task-order__info">
                        <div className="task-order__address">
                            {task.point_title ||
                                (task.point_details &&
                                    task.point_details.country_short +
                                        "-" +
                                        task.point_details.postal_code +
                                        " " +
                                        task.point_details.city)}
                        </div>
                        <div className="task-order__date-time">
                            {getTimeComponent()}
                        </div>
                    </div>
                    {isHovered && (
                        <div className="task-order__actions">
                            <button
                                type="button"
                                title="Edit task"
                                className="task-order__btn task-order__btn_edit"
                                onClick={(e) => handleEditModeTask(e, task)}
                            >
                                <FaPencilAlt />
                            </button>
                            <button
                                type="button"
                                title="Delete task"
                                className="task-order__btn task-order__btn_delete"
                                onClick={(e) => handleDeleteTask(e, task.id)}
                            >
                                <FaRegTrashAlt />
                            </button>
                            <button
                                type="button"
                                title="Show on map"
                                className="task-order__btn task-order__btn_map"
                                onClick={() => handleShowPointOnMap(task)}
                            >
                                <FaMapMarkerAlt />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default TaskOrder;
