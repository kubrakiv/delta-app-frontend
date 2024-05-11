import React from "react";
import "./AddTaskFooterComponent.scss";

const AddTaskFooterComponent = ({
    editModeTask,
    setEditModeTask,
    setShowAddTaskModal,
}) => {
    return (
        <>
            <div className="add-task-details__footer">
                {/* {editModeTask && (
                    <button
                        title="Edit Order"
                        className="add-task-details__footer-btn add-task-details__footer-btn_edit"
                        onClick={(e) => {
                            e.preventDefault();
                            setEditModeTask(true);
                        }}
                    >
                        Редагувати
                    </button>
                )} */}

                <button
                    title="Save Order"
                    className="add-task-details__footer-btn add-task-details__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    title="Close Order"
                    className="add-task-details__footer-btn add-task-details__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAddTaskModal(false);
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default AddTaskFooterComponent;
