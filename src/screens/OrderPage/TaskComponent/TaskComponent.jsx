import React, { useEffect, useMemo, useState } from "react";
import TaskOrder from "../../../components/Task/TaskOrder";
import { getDateTime } from "../../../utils/getDateTime";
import { useSelector } from "react-redux";
import axios from "axios";

function TaskComponent() {
    const order = useSelector((state) => state.ordersInfo.order.data);

    const [tasks, setTasks] = useState(order.tasks || []);
    const [editModeTask, setEditModeTask] = useState(false);

    const [selectedPoint, setSelectedPoint] = useState({});

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

        setEditModeTask(true);
        // setShowAddTaskModal(true);
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
                            handleEditModeTask={handleEditModeTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    </div>
                ))}
        </>
    );
}

export default TaskComponent;
