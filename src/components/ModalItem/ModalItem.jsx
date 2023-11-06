import Modal from "react-bootstrap/Modal";
import EditTaskComponent from "../Tasks/EditTaskComponent";
import AddTaskComponent from "../AddTask/AddTaskComponent";

export const ModalItem = ({
    showModal,
    onCloseModal,
    editMode = false,
    data,
    onTaskUpdate,
    onTaskCreate,
    selectedDate,
    selectedTruck,
}) => {
    console.log(data, selectedDate, selectedTruck, "this is data for modal");
    return (
        <Modal show={showModal} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {editMode ? "Edit" : "Add"}
                    {" Task"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editMode ? (
                    <EditTaskComponent
                        task={data}
                        onTaskUpdate={onTaskUpdate}
                        onCloseModal={onCloseModal}
                    />
                ) : (
                    <AddTaskComponent
                        selectedDate={selectedDate}
                        selectedTruck={selectedTruck}
                        onCloseModal={onCloseModal}
                        onTaskCreate={onTaskCreate}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};
