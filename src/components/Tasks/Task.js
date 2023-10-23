import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Task({ task }) {
    // Extracting date and time separately
    // const dateTime = new Date(task.start_date_time);
    // const formattedTime = dateTime.toLocaleTimeString().substring(0, 5);
    const [showModal, setsShowModal] = useState(false);

    const handleModalShow = () => setsShowModal(true);
    const handleModalClose = () => setsShowModal(false);

    return (
        <div className="task">
            <div className="task__time">
                {new Date(task.start_date_time)
                    .toLocaleTimeString()
                    .substring(0, 5)}
            </div>
            <div className="task__title" onClick={handleModalShow}>
                {task?.title}
            </div>
            {/* <div className="task__truck">{task?.truck}</div> */}
        </div>

        // <Card className="my-3 p-3 rounded">
        //     <Link to={`/tasks/${task.id}`}>
        //         <Card.Title>{task.title}</Card.Title>
        //     </Link>
        //     <Card.Text>
        //         <strong>Date and Time:</strong> {formattedDate} -{" "}
        //         {formattedTime}
        //     </Card.Text>
        //     <Card.Text>
        //         <strong>Truck:</strong> {task.truck}
        //     </Card.Text>
        //     <Card.Text>
        //         <strong>Driver:</strong> {task.driver}
        //     </Card.Text>
        // </Card>
    );
}

export default Task;
