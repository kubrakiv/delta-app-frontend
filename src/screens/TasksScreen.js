import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
// import tasks from "../tasks";
import axios from "axios";
import ModalTaskLeftSideComponent from "../components/Tasks/ModalTaskLeftSideComponent";
import Task from "../components/Tasks/Task";

function TasksScreen() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await axios.get("/api/tasks/");
            setTasks(data);
        }
        fetchTasks();
    }, []);

    const handleRowClick = (task) => {
        setSelectedTask(task);
        navigate(`/tasks/${task.id}`);
    };

    const handleButtonClick = (event, task) => {
        // Prevent the button click from propagating to the row click
        event.stopPropagation();
        // Handle button click logic here
        console.log("Button clicked for task:", task);
    };

    return (
        <>
            {/* <div className="table-container"> */}
            <h2 className="p-3 table-name">Таблиця завдань</h2>
            <Table bordered variant="dark" className="table">
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
                </thead>
                <tbody data-link="row" className="rowlink">
                    {tasks.map((task, index) => (
                        <tr
                            key={index}
                            className="table"
                            onClick={() => handleRowClick(task)}
                        >
                            <td className="text-center">{task.id}</td>
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
                                <ModalTaskLeftSideComponent
                                    name={"Task"}
                                    placement={"end"}
                                    task={task}
                                    onClick={(event) =>
                                        handleButtonClick(event, task)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* </div> */}
        </>
    );
}

export default TasksScreen;
