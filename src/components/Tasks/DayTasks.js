import { Button } from "react-bootstrap";
import Task from "./Task";

function DayTasks({ tasks, onSelect }) {
    const hasTasks = tasks.length > 0;

    return (
        <>
            {hasTasks &&
                tasks.map((t) => <Task task={t} onSelect={onSelect} />)}
            <Button
                type="button"
                className="btn btn-light"
                onClick={() => onSelect(null, false)}
            >
                +
            </Button>
        </>
    );
}

export default DayTasks;
