import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddTaskScreen from "../../screens/AddTaskScreen";
import EditTaskComponent from "./EditTaskComponent";

function ModalTaskLeftSideComponent({ name, task, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="me-2">
                {name}
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditTaskComponent task={task} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ModalTaskLeftSideComponent;
