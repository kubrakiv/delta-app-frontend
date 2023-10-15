import React, { useState, useEffect } from "react";
import { getISOWeek } from "date-fns";
import { Row, Col, Container } from "react-bootstrap";
import Task from "../components/Task";
import DateComponent from "../components/DateComponent";
import axios from "axios";
// import tasks from "../components/tasks";
import {
    WeekPlannerTest,
    generateDatesArray,
    formatDate,
} from "../components/WeekPlanner/WeekPlannerTest";

function PlanScreenTest() {
    const [tasks, setTasks] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(getISOWeek(new Date()));
    const [datesArray, setDatesArray] = useState(
        generateDatesArray(new Date(), selectedWeek)
    );

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await axios.get("/api/tasks/");
            setTasks(data);
        }
        fetchTasks();
    }, [selectedWeek]); // Fetch tasks whenever the selected week changes

    // Group tasks by date for easier rendering
    const handleWeekChange = (newWeek) => {
        setSelectedWeek(newWeek);
        setDatesArray(generateDatesArray(new Date(), newWeek));
    };

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
                <WeekPlannerTest
                    onWeekChange={handleWeekChange}
                    selectedWeek={selectedWeek}
                />
            </Row>
            <Row>
                {datesArray.map(([date, formattedDate]) => (
                    <Col key={date} md={2}>
                        <DateComponent date={formattedDate} />
                        {tasks
                            .filter(
                                (task) =>
                                    formatDate(
                                        new Date(task.start_date_time)
                                    ) === date
                            )
                            .map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PlanScreenTest;
