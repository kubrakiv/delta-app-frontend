import React, { useEffect, useMemo, useState } from "react";
import TaskOrder from "../../../components/Task/TaskOrder";
import { getDateTime } from "../../../utils/getDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setEditModeTask } from "../../../actions/orderActions";
import { setPointDetailsData } from "../../../actions/pointActions";

function TaskComponent() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.ordersInfo.order.data);

    const [tasks, setTasks] = useState(order.tasks || []);

    useEffect(() => {
        setTasks(order.tasks);
    }, [order]);

    const sortedTasks = useMemo(() => {
        return tasks && tasks.length > 0
            ? [...tasks].sort((a, b) => {
                  let dateTimeA = getDateTime(a.start_date, a.start_time);
                  let dateTimeB = getDateTime(b.start_date, b.start_time);
                  return dateTimeA - dateTimeB;
              })
            : [];
    }, [tasks]);

    const handleEditModeTask = (e, task) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(setEditModeTask(task, true));
        dispatch(setPointDetailsData(task.point_details));
    };

    const handleDeleteTask = async (e, taskId) => {
        e.preventDefault();
        e.stopPropagation();

        const isConfirmed = window.confirm(
            "Ви впевнені, що хочете видалити задачу?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axios.delete(`/api/tasks/delete/${taskId}/`);
            console.log("Task deleted successfully:", response.data);

            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error.message);
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
