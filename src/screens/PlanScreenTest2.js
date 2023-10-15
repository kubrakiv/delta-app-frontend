import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Task from "../components/Task";
import DateComponent from "../components/DateComponent";
import axios from "axios";
import { WeekPlannerTest2 } from "../components/WeekPlanner/WeekPlannerTest2";

function PlanScreenTest2() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await axios.get("/api/tasks/");
            setTasks(data);
        }
        fetchTasks();
    }, []);

    // Group tasks by date for easier rendering
    const tasksByDate = tasks.reduce((acc, task) => {
        const dateKey = task.start_date_time.split("T")[0]; // Assuming each task has a 'start_date_time' property
        acc[dateKey] = [...(acc[dateKey] || []), task];
        return acc;
    }, {});

    const weekDays = Object.keys(tasksByDate);

    return (
        <Container>
            <Row>
                {weekDays.map((date) => (
                    <Col key={date} md={2}>
                        <DateComponent date={date} />
                        {/* Render tasks for the current date */}
                        {tasksByDate[date].map((task) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PlanScreenTest2;
