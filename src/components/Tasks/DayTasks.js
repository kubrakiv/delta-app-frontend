import { Button } from "react-bootstrap";

function DayTasks({ tasks, onSelect }) {
    const hasTasks = tasks.length > 0;

    return (
        <>
            {hasTasks &&
                tasks.map((t) => (
                    <>
                        <div className="task__container" key={t.id}>
                            {/* <Task task={t} /> */}
                            <div
                                className="task"
                                onClick={() => onSelect(t, true)}
                            >
                                <div className="task__time">
                                    {new Date(t.start_date_time)
                                        .toLocaleTimeString()
                                        .substring(0, 5)}
                                </div>
                                <div className="task__title">{t.title}</div>
                            </div>
                        </div>
                    </>
                ))}
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
