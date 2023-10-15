import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";

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
        </Container>
    );
}

export default PlanScreen;
