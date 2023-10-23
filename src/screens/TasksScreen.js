import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
// import tasks from "../tasks";
import axios from "axios";

function TasksScreen() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await axios.get("/api/tasks/");
            setTasks(data);
        }
        fetchTasks();
    }, []);

    return (
        <div>
            <h1 className="p-3">Таблиця завдань</h1>
            <Table bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Time</th>
                        <th className="text-center">Truck</th>
                        <th className="text-center">Driver</th>
                        <th className="text-center">Buttons</th>
                    </tr>
                    <tr className="spacer"></tr>
                </thead>
                <tbody data-link="row" className="rowlink">
                    {tasks.map((task, index) => (
                        <>
                            <tr key={index} className="table">
                                <td className="text-center">
                                    <Link to={`${task.id}`}>{task.id}</Link>
                                </td>
                                <td className="text-center">{task.title}</td>
                                <td className="text-center">
                                    {new Date(
                                        task.start_date_time
                                    ).toLocaleDateString()}
                                </td>
                                <td className="text-center">
                                    {new Date(task.start_date_time)
                                        .toLocaleTimeString()
                                        .substring(0, 5)}
                                </td>
                                <td className="text-center">{task.truck}</td>
                                <td className="text-center">{task.driver}</td>
                                <td className="text-center">
                                    <Button>Tap</Button>
                                </td>
                            </tr>
                            <tr className="spacer"></tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TasksScreen;
