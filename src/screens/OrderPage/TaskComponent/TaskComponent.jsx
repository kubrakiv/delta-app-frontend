import React from "react";
import TaskOrder from "../../../components/Task/TaskOrder";

function TaskComponent({
    tasks,
    setTasks,
    handleShowPointOnMap,
    handleEditModeTask,
    handleDeleteTask,
}) {
    const getDateTime = (date, time) => {
        return new Date(`${date}T${time}`);
    };

    const sortedTasks =
        tasks &&
        tasks.sort((a, b) => {
            let dateTimeA = getDateTime(a.start_date, a.start_time);
            let dateTimeB = getDateTime(b.start_date, b.start_time);
            return dateTimeA - dateTimeB;
        });

    setTasks(sortedTasks);

    return (
        <>
            {sortedTasks &&
                sortedTasks.map((task) => (
                    <div key={task.id}>
                        <TaskOrder
                            task={task}
                            handleShowPointOnMap={handleShowPointOnMap}
                            handleEditModeTask={handleEditModeTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    </div>
                ))}
        </>
    );
}

export default TaskComponent;
