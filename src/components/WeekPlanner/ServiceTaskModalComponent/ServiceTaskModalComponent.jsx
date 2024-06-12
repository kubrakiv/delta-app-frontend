import React from "react";
import "./ServiceTaskModalComponent.scss";
import AddServiceTaskComponent from "../../AddServiceTaskComponent/AddServiceTaskComponent";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";

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
    const handleModalClose = () => {
        setShowServiceTaskModal(false);
    };

    return (
        <>
            <GenericModalComponent
                show={showServiceTaskModal}
                onClose={handleModalClose}
                content={
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
                }
                footer
            />
        </>
    );
};

export default AddServiceTaskModalComponent;
