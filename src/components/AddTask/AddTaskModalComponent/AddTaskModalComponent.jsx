import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddTaskMode,
  setAddTaskNoOrderMode,
  setEditModeTask,
  setShowTaskModal,
} from "../../../actions/orderActions";

import AddPoint from "../../AddPoint/AddPoint";
import AddTaskComponent from "../AddTaskComponent";
import TabSwitcher from "../../TabSwitcher";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";
import AddTaskNoOrderComponent from "../AddTaskNoOrderComponent";

import "./AddTaskModalComponent.scss";

const AddTaskModalComponent = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.ordersInfo.task.data);
  const editModeTask = useSelector(
    (state) => state.ordersInfo.task.editModeTask
  );
  const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);
  const addTaskNoOrderMode = useSelector(
    (state) => state.ordersInfo.addTaskNoOrderMode
  );
  const showTaskModal = useSelector((state) => state.ordersInfo.showTaskModal);

  const [activeTab, setActiveTab] = useState(true);

  const handleToggleMode = () => {
    setActiveTab(!activeTab);
  };

  const handleModalClose = () => {
    dispatch(setShowTaskModal(false));

    if (addTaskNoOrderMode) {
      dispatch(setAddTaskMode(false));
      dispatch(setAddTaskNoOrderMode(false));
    }
    if (addTaskMode) {
      dispatch(setAddTaskMode(false));
    }
    if (editModeTask) {
      dispatch(setEditModeTask(task, !editModeTask));
    }
  };

  return (
    <GenericModalComponent
      // show={editModeTask || addTaskMode || addTaskNoOrderMode}
      show={showTaskModal}
      onClose={handleModalClose}
      content={
        <>
          <TabSwitcher
            activeTab={activeTab}
            handleToggleMode={handleToggleMode}
          />

          {activeTab ? (
            <>
              {addTaskNoOrderMode && (
                <AddTaskNoOrderComponent onCloseModal={handleModalClose} />
              )}
              {addTaskMode && (
                <AddTaskComponent onCloseModal={handleModalClose} />
              )}
              {editModeTask && (
                <AddTaskComponent
                  onCloseModal={handleModalClose}
                  initialTaskData={task}
                />
              )}
            </>
          ) : (
            <AddPoint
              onToggleMode={handleToggleMode}
              onAddTask={true}
              editMode={false}
            />
          )}
        </>
      }
    />
  );
};

export default AddTaskModalComponent;
