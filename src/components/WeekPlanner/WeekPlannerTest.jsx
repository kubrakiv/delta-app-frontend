import axios from "axios";
import { getISOWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DateComponent from "../DateComponent";
import "./WeekPlanner.scss";
import { generateDatesArray } from "./dateFunctions";
import TaskComponent from "../Tasks/TaskComponent";
import ModalTaskComponent from "../Tasks/ModalTaskComponent";

export const WeekPlannerTest = () => {
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
            // setTasks();
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
                    <Row>
                        <Col className="col-lg-2">
                            <div className="truck__header">
                                Truck <br />
                                Plates
                            </div>
                            {trucks.map((truck) => {
                                return (
                                    <div key={truck.id}>
                                        <div className="truck__container">
                                            <div className="truck__plates">
                                                {truck.plates}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Col>

                        {datesArray.map(([day, date]) => {
                            const dayTasks = tasks.filter(
                                (task) =>
                                    task.start_date_time.split("T")[0] === date
                            );

                            return (
                                <div className="col week__day-container day">
                                    <DateComponent day={day} date={date} />

                                    {dayTasks.map((task) => (
                                        <ModalTaskComponent
                                            key={task.id}
                                            task={task}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </>
    );
};
