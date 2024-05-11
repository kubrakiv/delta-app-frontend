import React, { useEffect, useRef } from "react";
import "./ServiceTaskModalComponent.scss";
import AddServiceTaskComponent from "../../AddServiceTaskComponent/AddServiceTaskComponent";

const AddServiceTaskModalComponent = ({
    showServiceTaskModal,
    setShowServiceTaskModal,
    selectedTask,
    selectedDate,
    setSelectedDate,
    selectedTruck,
    setSelectedTruck,
    selectedDriver,
    setSelectedDriver,
    handleSelectDriver,
    selectedTaskType,
    setSelectedTaskType,
    handleTaskCreate,
    handleTaskUpdate,
    editModeServiceTask,
    setEditModeServiceTask,
}) => {
    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowServiceTaskModal(false);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowServiceTaskModal(false);
            }
        };

        // document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            // document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    });
    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: showServiceTaskModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`add-service-task-modal${
                        showServiceTaskModal ? "" : " hidden"
                    }`}
                    style={{
                        display: showServiceTaskModal ? "block" : "none",
                    }}
                >
                    <AddServiceTaskComponent
                        setShowServiceTaskModal={setShowServiceTaskModal}
                        showServiceTaskModal={showServiceTaskModal}
                        selectedTask={selectedTask}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTruck={selectedTruck}
                        setSelectedTruck={setSelectedTruck}
                        selectedDriver={selectedDriver}
                        setSelectedDriver={setSelectedDriver}
                        handleSelectDriver={handleSelectDriver}
                        selectedTaskType={selectedTaskType}
                        setSelectedTaskType={setSelectedTaskType}
                        handleTaskCreate={handleTaskCreate}
                        handleTaskUpdate={handleTaskUpdate}
                        editModeServiceTask={editModeServiceTask}
                        setEditModeServiceTask={setEditModeServiceTask}
                    />
                </div>
            </div>
        </>
    );
};

export default AddServiceTaskModalComponent;
