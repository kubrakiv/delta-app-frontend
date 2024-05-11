import React, { useEffect, useState } from "react";
import "./Task.scss";
import {
    FaPencilAlt,
    FaRegCheckCircle,
    FaRegClock,
    FaRegTrashAlt,
    FaRoute,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Task({
    task,
    onSelect,
    handleEndTime,
    handleStartTime,
    handleDeleteTask,
    handleEditModeTask,
    showDriver,
}) {
    const [isHovered, setHovered] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [unloadingStatus, setUnloadingStatus] = useState(false);

    useEffect(() => {
        // Function to set loading and unloading statuses
        const setStatus = () => {
            if (task.type === "Завантаження") {
                if (task.end_date && task.end_time) {
                    setLoadingStatus(true);
                } else {
                    setLoadingStatus(false);
                }
            } else if (task.type === "Розвантаження") {
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
            case "Завантаження":
                if (!endDate || !endTime) {
                    return "rgb(255, 255, 0)"; //yellow color
                } else {
                    return "rgba(0, 0, 255, 0.8)"; //blue color
                }

            case "Розвантаження":
                if (!endDate || !endTime) {
                    return "rgb(255, 0, 255)"; //pink color
                } else {
                    return "rgba(0, 255, 0, 0.8)"; //green color
                }
            case "Ремонт":
                return "red"; //red color
            case "Дорога":
                return "rgba(255, 165, 0, 0.8)"; //orange color
            default:
                return "rgba(140, 177, 186, 0.3)"; //grey color
        }
    };

    const getTextColor = (taskType, endDate, endTime) => {
        switch (taskType) {
            case "Завантаження":
                if (!endDate || !endTime) {
                    return "black";
                } else {
                    return "white";
                }
            case "Розвантаження":
                return "black";
            // case "Ремонт":
            // return "white";
            default:
                return "black";
        }
    };

    const getTimeComponent = (taskType, endDate, endTime) => {
        switch (taskType) {
            case "Завантаження":
                return !loadingStatus ? (
                    <>
                        <div className="task__time">
                            {task.start_time.substring(0, 5)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="task__time">
                            {task.end_time.substring(0, 5)}
                        </div>
                    </>
                );
            case "Розвантаження":
                return !unloadingStatus ? (
                    <>
                        <div className="task__time">
                            {task.start_time.substring(0, 5)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="task__time">
                            {task.end_time.substring(0, 5)}
                        </div>
                    </>
                );
            case "Ремонт":
                return !loadingStatus ? (
                    <>
                        <div className="task__time">
                            {task.start_time.substring(0, 5)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="task__time">
                            {task.end_time.substring(0, 5)}
                        </div>
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
                    onClick={() => onSelect({ task: task, editMode: true })}
                    style={taskStyle}
                >
                    {isHovered && (
                        <div className="task-actions">
                            {task.type === "Завантаження" ||
                            task.type === "Розвантаження" ? (
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
                                    onClick={(e) =>
                                        handleDeleteTask(e, task.id)
                                    }
                                >
                                    <FaRegTrashAlt />
                                </button>
                            )}
                            {task.type === "Ремонт" ||
                            task.type === "Дорога" ? (
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
                                onClick={handleStartTime}
                            >
                                <FaRegClock />
                            </button>
                            <button
                                type="button"
                                title="Завершено"
                                className="task-actions_third"
                                onClick={handleEndTime}
                            >
                                <FaRegCheckCircle />
                            </button>
                        </div>
                    )}
                    <div className="task-details" style={textStyle}>
                        {showDriver && (
                            <div className="task-details__driver">
                                {task.driver}
                            </div>
                        )}
                        <span>
                            {getTimeComponent(
                                task.type,
                                task.end_date,
                                task.end_time
                            )}
                        </span>
                        <div className="task__title">{task.title}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Task;
