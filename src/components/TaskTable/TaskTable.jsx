import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalTaskLeftSideComponent from "../Tasks/ModalTaskLeftSideComponent";
import "./TaskTable.scss";

function TaskTable() {
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

    // const handleButtonClick = (event, task) => {
    //     event.stopPropagation();
    //     console.log("Button clicked for task:", task);
    // };

    return (
        <>
            <div className="table__container">
                <h2 className="table__name">Таблиця завдань</h2>
                <table className="task-table">
                    {/* <caption className="table__name">Таблиця завдань</caption> */}
                    <thead className="task-table__head">
                        <tr className="task-table__head-row">
                            <th className="task-table__head-th">ID</th>
                            <th className="task-table__head-th">Order</th>
                            <th className="task-table__head-th">Title</th>
                            <th className="task-table__head-th">Date</th>
                            <th className="task-table__head-th">Time</th>
                            <th className="task-table__head-th">Truck</th>
                            <th className="task-table__head-th">Driver</th>
                            <th className="task-table__head-th">Buttons</th>
                        </tr>
                    </thead>
                    <tbody data-link="row" className="task-table__body">
                        {tasks.map((task, index) => (
                            <tr
                                key={index}
                                className="task-table__body-row"
                                onClick={() => handleRowClick(task)}
                            >
                                <td className="task-table__body-td">
                                    {task.id}
                                </td>
                                <td className="task-table__body-td">
                                    {task.order}
                                </td>
                                <td className="task-table__body-td">
                                    {task.title}
                                </td>
                                <td className="task-table__body-td">
                                    {task.start_date}
                                </td>
                                <td className="task-table__body-td">
                                    {task.start_time}
                                </td>
                                <td className="task-table__body-td">
                                    {task.truck}
                                </td>
                                <td className="task-table__body-td">
                                    {task.driver}
                                </td>
                                <td className="task-table__body-td">
                                    <ModalTaskLeftSideComponent
                                        name={"Task"}
                                        placement={"end"}
                                        task={task}
                                        // onClick={(event) =>
                                        //     handleButtonClick(event, task)
                                        // }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskTable;
