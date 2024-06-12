import React from "react";
import "./AddTaskFooterComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddTaskMode, setEditModeTask } from "../../../actions/orderActions";

const AddTaskFooterComponent = () => {
    const dispatch = useDispatch();
    const task = useSelector((state) => state.ordersInfo.task.data);
    const editMode = useSelector((state) => state.ordersInfo.task.editMode);
    const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);

    return (
        <>
            <div className="add-task-details__footer">
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
                        if (editMode) {
                            dispatch(setEditModeTask(task, !editMode));
                        }
                        if (addTaskMode) {
                            dispatch(setAddTaskMode(false));
                        }
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default AddTaskFooterComponent;
