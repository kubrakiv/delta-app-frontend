import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  listOrderDetails,
  setEditModeTask,
  setShowTaskModal,
} from "../../../actions/orderActions";
import { deleteTask } from "../../../features/tasks/tasksOperations";

import { getDateTime } from "../../../utils/getDateTime";
import { setPointDetailsData } from "../../../features/points/pointsSlice";

import TaskOrder from "../../../components/Task/TaskOrder";

function TaskComponent() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.ordersInfo.order.data);

  useEffect(() => {
    if (order.id) {
      dispatch(listOrderDetails(order.id));
    }
  }, [order.id]);

  const sortedTasks = useMemo(() => {
    return order.tasks && order.tasks.length > 0
      ? [...order.tasks].sort((a, b) => {
          let dateTimeA = getDateTime(a.start_date, a.start_time);
          let dateTimeB = getDateTime(b.start_date, b.start_time);
          return dateTimeA - dateTimeB;
        })
      : [];
  }, [order.tasks]);

  const handleEditModeTask = (e, task) => {
    e.preventDefault();

    dispatch(setEditModeTask(task, true));
    dispatch(setShowTaskModal(true));
    dispatch(setPointDetailsData(task.point_details));
  };

  const handleDeleteTask = async (e, taskId) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Ви впевнені, що хочете видалити задачу?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await dispatch(deleteTask(taskId)).unwrap();
      dispatch(listOrderDetails(order.id));
    } catch (error) {
      console.error("Failed to delete the task:", error);
    }
  };

  return (
    <>
      {sortedTasks &&
        sortedTasks.map((task) => (
          <div key={task.id}>
            <TaskOrder
              task={task}
              onEditMode={handleEditModeTask}
              handleDeleteTask={handleDeleteTask}
            />
          </div>
        ))}
    </>
  );
}

export default TaskComponent;
