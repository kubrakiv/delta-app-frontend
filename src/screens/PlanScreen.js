import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Task from "../components/Task";
import Date from "../components/Date";
import Truck from "../components/Truck";
import axios from "axios";
import { WeekPlanner } from "../components/WeekPlanner";

function PlanScreen() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await axios.get("/api/tasks/");
            setTasks(data);
        }
        fetchTasks();
    }, []);

    return (
        <Container>
            <Row>
                <WeekPlanner />
            </Row>
            {/* <Row>
                {tasks.map((task) => (
                    <Col md={2} key={task.id}>
                        <Truck task={task} />
                    </Col>
                ))}
                {tasks.map((task) => (
                    <Col md={2} key={task.id}>
                        <Date task={task} />
                    </Col>
                ))}
            </Row>
            <Row>
                {tasks.map((task) => (
                    <Col key={task.id} sm={12} md={6} lg={4} xl={3}>
                        <Task task={task} />
                    </Col>
                ))}
            </Row> */}
        </Container>
    );
}

export default PlanScreen;
