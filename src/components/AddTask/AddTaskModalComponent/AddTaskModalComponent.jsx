import React, { useRef, useEffect, useState } from "react";
import AddPoint from "../../AddPoint/AddPoint";
import AddTaskComponent from "../AddTaskComponent";
import cn from "classnames";
import "./AddTaskModalComponent.scss";
import AddTaskHeaderComponent from "../AddTaskHeaderComponent/AddTaskHeaderComponent";
import AddTaskModalCloseComponent from "../AddTaskModalCloseComponent/AddTaskModalCloseComponent";

const AddTaskModalComponent = ({
    order,
    selectedTask,
    selectedTruck,
    setSelectedTruck,
    selectedDriver,
    setSelectedDriver,
    showAddTaskModal,
    setShowAddTaskModal,
    selectedPoint,
    setSelectedPoint,
    onPointCreate,
    editModeTask,
    setEditModeTask,
    tasks,
    setTasks,
}) => {
    const modalRef = useRef(null);
    const [activeTab, setActiveTab] = useState(true);

    const handleToggleMode = () => {
        setActiveTab(!activeTab);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowAddTaskModal(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowAddTaskModal(false);
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
                style={{ display: showAddTaskModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`add-task-modal${
                        showAddTaskModal ? "" : " hidden"
                    }`}
                    style={{ display: showAddTaskModal ? "block" : "none" }}
                >
                    <div className="add-task-modal__header">
                        <div
                            className={cn(
                                "add-task-modal__header-btn add-task-modal__header-btn-left",
                                {
                                    "add-task-modal__header-btn_active":
                                        activeTab,
                                }
                            )}
                            onClick={handleToggleMode}
                        >
                            Вибрати пункт
                        </div>
                        <div
                            className={cn(
                                "add-task-modal__header-btn add-task-modal__header-btn-right",
                                {
                                    "add-task-modal__header-btn_active":
                                        !activeTab,
                                }
                            )}
                            onClick={handleToggleMode}
                        >
                            Додати пункт
                        </div>
                    </div>
                    {activeTab ? (
                        <AddTaskComponent
                            order={order}
                            selectedTask={selectedTask}
                            selectedTruck={selectedTruck}
                            setSelectedTruck={setSelectedTruck}
                            selectedDriver={selectedDriver}
                            setSelectedDriver={setSelectedDriver}
                            setShowAddTaskModal={setShowAddTaskModal}
                            editModeTask={editModeTask}
                            setEditModeTask={setEditModeTask}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    ) : (
                        <AddPoint
                            onToggleMode={handleToggleMode}
                            onAddTask={true}
                            editMode={false}
                            setShowAddPointModal={setShowAddTaskModal}
                            onPointCreate={onPointCreate}
                            selectedPoint={selectedPoint}
                            setSelectedPoint={setSelectedPoint}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default AddTaskModalComponent;
