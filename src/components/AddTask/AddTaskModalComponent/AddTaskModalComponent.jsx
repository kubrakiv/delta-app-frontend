import { useDispatch, useSelector } from "react-redux";
import {
  setAddTaskMode,
  setAddTaskNoOrderMode,
  setEditModeTask,
  setShowTaskModal,
} from "../../../actions/orderActions";
import {
  setSelectedPoint,
  setTabToggleMode,
} from "../../../features/points/pointsSlice";

import AddPoint from "../../AddPoint/AddPoint";
import AddTaskComponent from "../AddTaskComponent";
import TabSwitcher from "../../TabSwitcher";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";
import AddTaskNoOrderComponent from "../AddTaskNoOrderComponent";

import "./AddTaskModalComponent.scss";
import { setMapCurrentLocation } from "../../../actions/mapActions";
import { selectSelectedPoint } from "../../../features/points/pointsSelectors";

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

  const tabToggleMode = useSelector((state) => state.pointsInfo.tabToggleMode);
  const selectedPoint = useSelector(selectSelectedPoint);

  const handleToggleMode = () => {
    dispatch(setTabToggleMode(!tabToggleMode));
  };

  const handleModalClose = () => {
    dispatch(setShowTaskModal(false));
    dispatch(setMapCurrentLocation({}));
    dispatch(setSelectedPoint({}));

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
      show={showTaskModal}
      onClose={handleModalClose}
      content={
        <>
          <TabSwitcher
            activeTab={tabToggleMode}
            handleToggleMode={handleToggleMode}
          />

          {tabToggleMode ? (
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
            <AddPoint onAddTask={true} onCloseModal={handleModalClose} />
          )}
        </>
      }
    />
  );
};

export default AddTaskModalComponent;
