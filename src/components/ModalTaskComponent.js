import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import AddTaskScreen from "../screens/AddTaskScreen";

function ModalTaskComponent({ task }) {
    const [showModal, setsShowModal] = useState(false);

    // const handleModalShow = () => setsShowModal(true);
    const handleModalToggle = () => setsShowModal(!showModal);
    const handleModalClose = () => setsShowModal(false);

    const dateTime = new Date(task.start_date_time);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString().substring(0, 5);

    return (
        <div className="task__container" onClick={handleModalToggle}>
            <div className="task__time">{formattedTime}</div>
            <div className="task__title">{task.title}</div>
            <div className="task__truck">{task.truck}</div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Task add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTaskScreen task={task} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalTaskComponent;
