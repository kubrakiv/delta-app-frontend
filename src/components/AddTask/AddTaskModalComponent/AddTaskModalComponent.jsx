import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddTaskMode,
  setAddTaskNoOrderMode,
  setEditModeTask,
} from "../../../actions/orderActions";
import "./AddTaskModalComponent.scss";
import AddPoint from "../../AddPoint/AddPoint";
import AddTaskComponent from "../AddTaskComponent";
import TabSwitcher from "../../TabSwitcher";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";
import AddTaskNoOrderComponent from "../AddTaskNoOrderComponent";

const AddTaskModalComponent = ({
  selectedPoint,
  setSelectedPoint,
  onPointCreate,
  showAddTaskModal,
}) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.ordersInfo.task.data);
  const editMode = useSelector((state) => state.ordersInfo.task.editModeTask);
  const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);
  const addTaskNoOrderMode = useSelector(
    (state) => state.ordersInfo.addTaskNoOrderMode
  );

  const [activeTab, setActiveTab] = useState(true);

  const handleToggleMode = () => {
    setActiveTab(!activeTab);
  };

  const handleModalClose = () => {
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
    <GenericModalComponent
      show={editMode || addTaskMode || addTaskNoOrderMode || showAddTaskModal}
      onClose={handleModalClose}
      content={
        <>
          <TabSwitcher
            activeTab={activeTab}
            handleToggleMode={handleToggleMode}
          />

          {activeTab ? (
            <>
              {addTaskNoOrderMode && <AddTaskNoOrderComponent />}
              {addTaskMode && <AddTaskComponent />}
            </>
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
  );
};

export default AddTaskModalComponent;
