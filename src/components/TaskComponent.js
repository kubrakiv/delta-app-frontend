import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function TaskComponent({ task }) {
    // Extracting date and time separately
    const dateTime = new Date(task.start_date_time);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString().substring(0, 5);

    return (
        <div className="task__container">
            <div className="task__time">{formattedTime}</div>
            <div className="task__title">{task.title}</div>
            <div className="task__truck">{task.truck}</div>
        </div>
    );
}

export default TaskComponent;
