import React from "react";
import "./AddTaskFooterComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddTaskMode,
  setAddTaskNoOrderMode,
  setEditModeTask,
} from "../../../actions/orderActions";

const AddTaskFooterComponent = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.ordersInfo.task.data);
  const editMode = useSelector((state) => state.ordersInfo.task.editMode);
  const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);
  const addTaskNoOrderMode = useSelector(
    (state) => state.ordersInfo.addTaskNoOrderMode
  );

  const handleModalClose = (e) => {
    e.preventDefault();
    if (addTaskNoOrderMode) {
      dispatch(setAddTaskMode(false));
      dispatch(setAddTaskNoOrderMode(false));
    }
    if (addTaskMode) {
      dispatch(setAddTaskMode(false));
    }
    if (editMode) {
      dispatch(setEditModeTask(task, !editMode));
    }
  };

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
          onClick={(e) => handleModalClose(e)}
        >
          Закрити
        </button>
      </div>
    </>
  );
};

export default AddTaskFooterComponent;
