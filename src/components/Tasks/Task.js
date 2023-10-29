import React from "react";

function Task({ task, onSelect }) {
    return (
        <>
            <div className="task__container" key={task.id}>
                <div className="task" onClick={() => onSelect(task, true)}>
                    <div className="task__time">
                        {new Date(task.start_date_time)
                            .toLocaleTimeString()
                            .substring(0, 5)}
                    </div>
                    <div className="task__title">{task.title}</div>
                </div>
            </div>
        </>
    );
}

export default Task;
