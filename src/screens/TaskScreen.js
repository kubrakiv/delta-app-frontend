import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import axios from "axios";

function TaskScreen() {
    const { id } = useParams();
    // const task = tasks.find((p) => p.id === id);

    const [task, setTask] = useState([]);

    useEffect(() => {
        async function fetchTask() {
            const { data } = await axios.get(`/api/tasks/${id}`);
            setTask(data);
        }
        fetchTask();
    }, []);

    return (
        <div>
            <Link to="/tasks" className="btn btn-light my-3">
                Return
            </Link>
            <Row md={6} className="mt-3">
                {task.title}
            </Row>
        </div>
    );
}

export default TaskScreen;
