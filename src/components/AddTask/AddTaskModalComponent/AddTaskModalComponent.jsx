import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddTaskMode, setEditModeTask } from "../../../actions/orderActions";
import "./AddTaskModalComponent.scss";
import AddPoint from "../../AddPoint/AddPoint";
import AddTaskComponent from "../AddTaskComponent";
import TabSwitcher from "../../TabSwitcher";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";

const AddTaskModalComponent = ({
  selectedPoint,
  setSelectedPoint,
  onPointCreate,
}) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.ordersInfo.task.data);
  const editMode = useSelector((state) => state.ordersInfo.task.editMode);
  const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);

  const [activeTab, setActiveTab] = useState(true);

  const handleToggleMode = () => {
    setActiveTab(!activeTab);
  };

  const handleModalClose = () => {
    if (addTaskMode) {
      dispatch(setAddTaskMode(false));
    }
    if (editMode) {
      dispatch(setEditModeTask(task, !editMode));
    }
  };

  return (
    <>
      <GenericModalComponent
        show={editMode || addTaskMode}
        onClose={handleModalClose}
        content={
          <>
            <TabSwitcher
              activeTab={activeTab}
              handleToggleMode={handleToggleMode}
            />

            {activeTab ? (
              <AddTaskComponent />
            ) : (
              <AddPoint
                onToggleMode={handleToggleMode}
                onAddTask={true}
                editMode={false}
                // setShowAddPointModal={setShowAddTaskModal}
                onPointCreate={onPointCreate}
                selectedPoint={selectedPoint}
                setSelectedPoint={setSelectedPoint}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default AddTaskModalComponent;
