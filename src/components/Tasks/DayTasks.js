import Task from "../Task/Task";
import { FaPlus } from "react-icons/fa";

function DayTasks({ tasks, onSelect, dayNumber, truckId }) {
    const hasTasks = tasks.length > 0;

    return (
        <>
            {hasTasks &&
                tasks.map((t) => (
                    <Task
                        task={t}
                        onSelect={onSelect}
                        // dayNumber={dayNumber}
                        // truckId={truckId}
                    />
                ))}
            <button
                type="button"
                className="planner-button"
                onClick={() =>
                    onSelect({
                        task: null,
                        editMode: false,
                        dayNumber,
                        truckId,
                    })
                }
            >
                &#10010;
                {/* <FaPlus /> */}
            </button>
        </>
    );
}

export default DayTasks;
