import React from "react";
import "./Task.scss";

function Task({ task, onSelect }) {
    // const time_str = new Date(task.start_date_time)
    //     .toLocaleTimeString()
    //     .substring(0, 5);

    return (
        <>
            <div className="task__container">
                <div
                    className="task"
                    onClick={() => onSelect({ task: task, editMode: true })}
                >
                    <div className="task__time">
                        {task.start_time.substring(0, 5)}
                    </div>
                    <div className="task__type">{task.type}</div>
                    <div className="task__title">{task.title}</div>
                </div>
            </div>
        </>
    );
}

export default Task;
