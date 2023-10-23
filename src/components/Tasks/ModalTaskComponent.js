import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ModalItem } from "../ModalItem/ModalItem";
import EditTaskComponent from "./EditTaskComponent";
import Task from "./Task";

function ModalTaskComponent({ task }) {
    const [showModal, setsShowModal] = useState(false);

    const handleModalShow = () => {
        setsShowModal(true);
        console.log("Open modal");
    };
    const handleModalClose = () => {
        setsShowModal(false);
        console.log("Close modal");
    };

    const hasData = task.length > 0;

    if (hasData) {
        return (
            <>
                {task.map((t) => (
                    <>
                        <div className="task__container" key={t.id}>
                            {/* <Task task={t} /> */}
                            <div className="task" onClick={handleModalShow}>
                                <div className="task__time">
                                    {new Date(t.start_date_time)
                                        .toLocaleTimeString()
                                        .substring(0, 5)}
                                </div>
                                <div className="task__title">{t.title}</div>
                            </div>
                        </div>

                        <ModalItem
                            showModal={showModal}
                            onCloseModal={handleModalClose}
                            editMode={true}
                            data={t}
                        />
                    </>
                ))}
                <Button
                    type="button"
                    className="btn btn-light"
                    onClick={handleModalShow}
                >
                    +
                </Button>
            </>
        );
    }

    return (
        // <div className="task">
        <>
            <Button
                type="button"
                className="btn btn-light"
                onClick={handleModalShow}
            >
                +
            </Button>

            {/* <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTaskComponent task={t} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>

        // </div>
    );
}

export default ModalTaskComponent;
