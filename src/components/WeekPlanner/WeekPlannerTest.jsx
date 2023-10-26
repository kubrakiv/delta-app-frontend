import axios from "axios";
import { getISOWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DateComponent from "../DateComponent";
import "./WeekPlanner.scss";
import { generateDatesArray } from "./dateFunctions";

import DayTasks from "../Tasks/DayTasks";
import { ModalItem } from "../ModalItem/ModalItem";

export const WeekPlannerTest = () => {
    const date = new Date();
    const [tasks, setTasks] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [week, setWeek] = useState(getISOWeek(date));
    const [datesArray, setDatesArray] = useState(
        generateDatesArray(date, week)
    );
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const handleModalShow = () => {
        setShowModal(true);
        console.log("Open modal");
    };

    const handleModalClose = () => {
        setShowModal(false);
        console.log("Close modal");
    };

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

    const handleSelectTask = (task, editMode) => {
        setSelectedTask({});
        setEditMode(editMode);

        if (editMode) {
            setEditMode(true);
            setSelectedTask(task);
        }
        setShowModal(true);
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
                        <Col className="week__day-container day">
                            <div className="truck__header ">
                                Truck <br />
                                Plates
                            </div>
                        </Col>
                        {datesArray.map(([day, date]) => {
                            return (
                                <Col
                                    className="week__day-container day"
                                    key={date}
                                >
                                    <DateComponent day={day} date={date} />
                                </Col>
                            );
                        })}
                    </Row>

                    {/* rows with trucks */}
                    {trucks.map((truck) => {
                        const weeklyTasks = datesArray.map((date) => {
                            return tasks.filter((t) => {
                                return (
                                    t.start_date_time.split("T")[0] ===
                                        date[1] && truck.plates === t.truck
                                );
                            });
                        });

                        return (
                            <Row className="truck__week-container">
                                <Col className="truck__container">
                                    <div className="truck__plates">
                                        {truck.plates}
                                    </div>
                                </Col>

                                {weeklyTasks.map((dayTasks) => (
                                    <Col key={dayTasks?.id}>
                                        <DayTasks
                                            tasks={dayTasks}
                                            onSelect={handleSelectTask}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        );
                    })}
                </div>

                <ModalItem
                    showModal={showModal}
                    onCloseModal={handleModalClose}
                    editMode={editMode}
                    data={selectedTask}
                />
            </div>
        </>
    );
};
