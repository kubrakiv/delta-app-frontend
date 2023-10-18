import axios from "axios";
import { getISOWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import TaskComponent from "../TaskComponent";
import DateComponent from "../DateComponent";
import "./WeekPlanner.scss";
// import { generateDatesArray } from "./dateFunctions";

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
            {/* <h1>Week planner</h1> */}
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
                        <Col className="col-lg-2">
                            <div className="truck__header">
                                Truck <br />
                                Plates
                            </div>
                            {trucks.map((truck) => {
                                return (
                                    <div>
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
                            console.log(date);
                            const dayTasks = tasks.filter(
                                (task) =>
                                    task.start_date_time.split("T")[0] === date
                            );

                            console.log(dayTasks);
                            return (
                                <Col className="col week__day-container day">
                                    <DateComponent day={day} date={date} />

                                    {dayTasks.map((task) => (
                                        <TaskComponent
                                            key={task.id}
                                            task={task}
                                        />
                                    ))}
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </>
    );
};

// Function to generate the array of dates based on the week number
export const generateDatesArray = (currentDate, currentWeek) => {
    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weekStartDate =
        currentDate.getDate() -
        currentDate.getDay() +
        1 +
        (currentWeek - getISOWeek(currentDate)) * 7;

    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(currentDate);
        day.setDate(weekStartDate + i);
        return [weekDayNames[i], formatDate(day)];
    });
};

// Function to format the date as "YYYY-MM-DD"
export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
    }`;
};

/* tasks

1. Slice current week's tasks;
2. Unique cars array => map(
  car => (
    <Row>
      weekTasks.filter(task =>taskcar === car)
      .map(task => task.date === date)
    </Row>
  )
) */
