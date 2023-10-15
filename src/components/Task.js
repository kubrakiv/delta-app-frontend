import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Task({ task }) {
    // Extracting date and time separately
    const dateTime = new Date(task.start_date_time);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/tasks/${task.id}`}>
                <Card.Title>{task.title}</Card.Title>
            </Link>
            <Card.Text>
                <strong>Date and Time:</strong> {formattedDate} -{" "}
                {formattedTime}
            </Card.Text>
            <Card.Text>
                <strong>Truck:</strong> {task.truck}
            </Card.Text>
            <Card.Text>
                <strong>Driver:</strong> {task.driver}
            </Card.Text>
        </Card>
    );
}

export default Task;
