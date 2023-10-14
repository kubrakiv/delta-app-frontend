import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Task({ task }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/tasks/${task.id}`}>
                <Card.Title>{task.title}</Card.Title>
            </Link>
            <Card.Text>Дата і час: {task.start_date_time}</Card.Text>
            <Card.Text>{task.truck}</Card.Text>
            <Card.Text>{task.driver}</Card.Text>
        </Card>
    );
}

export default Task;
