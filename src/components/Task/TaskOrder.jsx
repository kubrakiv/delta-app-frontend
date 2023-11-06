import React, { useState } from "react";
import "./TaskOrder.scss";
import { FaCalendar, FaClock, FaArrowDown, FaArrowUp } from "react-icons/fa";

function TaskOrder({ task }) {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const iconStyle = {
        color: task.type === "Завантаження" ? "green" : "red",
    };

    const taskStyle = {
        backgroundColor: isHovered
            ? task.type === "Завантаження"
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
                    <div className="task-order__icon">
                        {task.type === "Завантаження" ? (
                            <FaArrowDown style={iconStyle} />
                        ) : (
                            <FaArrowUp style={iconStyle} />
                        )}
                    </div>
                    <div className="task-order__info">
                        <div className="task-order__address">{task.title}</div>
                        <div className="task-order__date-time">
                            <div className="task-order__date">
                                <FaCalendar /> {task.start_date}
                            </div>
                            <div className="task-order__time">
                                <FaClock /> {task.start_time}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskOrder;
