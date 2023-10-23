import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditTaskComponent from "../Tasks/EditTaskComponent";

export const ModalItem = ({
    showModal,
    onCloseModal,
    editMode = false,
    data,
}) => {
    console.log(data, "this is data for modal");
    return (
        <Modal show={showModal} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {editMode ? "Edit" : "Add"}
                    {" Task"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditTaskComponent task={data} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
