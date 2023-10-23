import axios from "axios";
import { getISOWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import TasksComponent from "../Tasks/TasksComponent";
import DateComponent from "../DateComponent";
import "./WeekPlanner.scss";
import { generateDatesArray } from "./dateFunctions";

export const WeekPlanner = () => {
    const date = new Date();
    const [tasks, setTasks] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [week, setWeek] = useState(getISOWeek(date));
    const [datesArray, setDatesArray] = useState(
        generateDatesArray(date, week)
    );

    useEffect(() => {
        async function fetchTasks() {
            const { data } = await axios.get("/api/tasks/");
            setTasks(data);
        }
        fetchTasks();
    }, []);

    useEffect(() => {
        async function fetchTrucks() {
            const { data } = await axios.get("/api/trucks/");
            setTrucks(data);
        }
        fetchTrucks();
    }, []);

    const handleWeekChange = (newWeek) => {
        setWeek(newWeek);
        setDatesArray(generateDatesArray(date, newWeek));
    };

    return (
        <>
            {/* week number handler */}
            <div className="week-number">
                <div className="week-number__container">
                    <button
                        type="button"
                        className="week-number__btn"
                        onClick={() => handleWeekChange(week - 1)}
                    >
                        &lt;
                    </button>
                    <div className="week-number__number">{week}</div>
                    <button
                        type="button"
                        className="week-number__btn"
                        onClick={() => handleWeekChange(week + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <hr />

            <div className="week">
                <div className="week__day-list">
                    {/* <div className="row"> */}
                    <Row>
                        <Col className="week__day-container day">
                            <div className="truck__header ">
                                Truck <br />
                                Plates
                            </div>
                        </Col>
                        {datesArray.map(([day, date]) => {
                            return (
                                <Col className="week__day-container day">
                                    <DateComponent day={day} date={date} />
                                </Col>
                            );
                        })}
                    </Row>

                    {/* rows with trucks */}
                    {trucks.map((truck) => {
                        /* console.log(truck, "this is truck"); */
                        const result = datesArray.map((date) => {
                            console.log(date[1], "this is date");

                            return tasks.filter((t) => {
                                /*                                     console.log(
                                        t.start_date_time.split("T")[0],
                                        date[1],
                                        "task"
                                    ); */
                                return (
                                    t.start_date_time.split("T")[0] ===
                                        date[1] && truck.plates === t.truck
                                );
                            });
                        });
                        console.log(result, "result");

                        const dayTasks = tasks.filter(
                            (task) =>
                                task.start_date_time.split("T")[0] === date &&
                                task.truck === truck.plates
                        );
                        // const test = [null, null, null, null, null, null, null];
                        console.log(dayTasks);
                        return (
                            <Row className="truck__week-container">
                                <Col className="truck__container">
                                    <div className="truck__plates">
                                        {truck.plates}
                                    </div>
                                </Col>

                                {result.map((task) => (
                                    <Col key={task?.id}>
                                        <TasksComponent task={task} />
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
