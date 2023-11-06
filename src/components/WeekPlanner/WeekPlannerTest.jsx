import axios from "axios";
import { getISOWeek } from "date-fns";
import { useEffect, useState } from "react";
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
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTaskUpdate = (taskId, taskData) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return taskData;
            }

            return task;
        });
        console.log(updatedTasks, "this is updated tasks");
        setTasks(updatedTasks);
    };

    const handleTaskCreate = (taskData) => {
        setTasks((prevTasks) => [...prevTasks, taskData]);
    };

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
        }
        fetchTasks();
    }, []);
    // console.log(tasks, "tasks");

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

    const handleSelectTask = ({ task, editMode, truckId, dayNumber }) => {
        setEditMode(editMode);

        if (editMode) {
            setSelectedTask(task);
            setEditMode(true);
        }

        setSelectedDate(datesArray[dayNumber]);

        const selectedTruck = trucks.find((t) => t.id === truckId);
        if (selectedTruck) {
            setSelectedTruck(selectedTruck);
            console.log("Truck found:", selectedTruck);
        } else {
            console.log("Truck not found for id:", truckId);
        }

        console.log(
            "beforeOpeningModal",
            trucks,
            truckId,
            selectedTruck,
            datesArray[dayNumber]
        );
        handleModalShow();
    };

    return (
        <div className="planner-container">
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

            <hr className="divide-block" />
            <div className="table-body-container">
                <div className="week">
                    <div className="week__day-list">
                        <div className="week-header__row">
                            <div className="week-header__day-container">
                                <div className="week-header__day-container_date-item">
                                    <div className="week-header__day-container_truck">
                                        Truck <br /> Plates
                                    </div>
                                </div>
                            </div>
                            {datesArray.map(([day, date]) => {
                                return (
                                    <div
                                        className="week-header__day-container"
                                        key={date}
                                    >
                                        <DateComponent day={day} date={date} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* rows with trucks */}
                        {trucks.map((truck) => {
                            const weeklyTasks = datesArray.map((date) => {
                                return tasks.filter((t) => {
                                    return (
                                        t.start_date === date[1] &&
                                        truck.plates === t.truck
                                    );
                                });
                            });

                            return (
                                <div className="week-truck__row">
                                    <div className="week-truck__day-container">
                                        <div className="week-truck__first-col">
                                            <div className="week-truck__plates">
                                                {truck.plates}
                                            </div>
                                        </div>
                                    </div>

                                    {weeklyTasks.map((dayTasks, dayNumber) => (
                                        <div
                                            className="week-truck__day-container"
                                            key={dayNumber}
                                        >
                                            <DayTasks
                                                tasks={dayTasks}
                                                onSelect={handleSelectTask}
                                                truckId={truck.id}
                                                dayNumber={dayNumber}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <ModalItem
                        showModal={showModal}
                        onCloseModal={handleModalClose}
                        editMode={editMode}
                        data={selectedTask}
                        onTaskUpdate={handleTaskUpdate}
                        selectedDate={selectedDate}
                        selectedTruck={selectedTruck}
                        onTaskCreate={handleTaskCreate}
                    />
                </div>
            </div>
        </div>
    );
};
