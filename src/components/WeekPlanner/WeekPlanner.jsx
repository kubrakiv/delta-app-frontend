import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getISOWeek, set } from "date-fns";
import "./WeekPlanner.scss";
import { generateDatesArray } from "./dateFunctions";
import { InputSwitch } from "primereact/inputswitch";

import DayTasks from "../Tasks/DayTasks";
import { ModalItem } from "../ModalItem/ModalItem";
import { Link } from "react-router-dom";
import WeekSwitcherComponent from "../WeekSwitcherComponent/WeekSwitcherComponent";
import WeekDateComponent from "../WeekDateComponent/WeekDateComponent";
import EndTimeModalComponent from "./EndTimeModalComponent/EndTimeModalComponent";
import StartTimeModalComponent from "./StartTimeModalComponent/StartTimeModalComponent";
import ServiceTaskModalComponent from "./ServiceTaskModalComponent/ServiceTaskModalComponent";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const WeekPlanner = () => {
    const date = new Date();
    const [isHovered, setHovered] = useState(false);

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const [tasks, setTasks] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [week, setWeek] = useState(getISOWeek(date));
    const [datesArray, setDatesArray] = useState(
        generateDatesArray(date, week)
    );
    const [showModal, setShowModal] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [showDriver, setShowDriver] = useState(false);
    const [showEndTimeModal, setShowEndTimeModal] = useState(false);
    const [showStartTimeModal, setShowStartTimeModal] = useState(false);
    const [showServiceTaskModal, setShowServiceTaskModal] = useState(false);

    // Hooks for edtiting tasks
    const [editMode, setEditMode] = useState(false);
    const [editModeServiceTask, setEditModeServiceTask] = useState(false);

    // Hooks for variables from the order
    const [selectedTask, setSelectedTask] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTruck, setSelectedTruck] = useState({});
    const [selectedDriver, setSelectedDriver] = useState({});
    const [selectedPoint, setSelectedPoint] = useState({});
    const [selectedTaskType, setSelectedTaskType] = useState({});

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

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

    const handleServiceTaskModalShow = () => {
        setShowServiceTaskModal(true);
        console.log("Open Service Task modal");
    };

    const handleServiceTaskModalClose = () => {
        setShowServiceTaskModal(false);
        console.log("Close Service Task modal");
    };

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

    const handleTruckDateSelect = ({ truckId, dayNumber }) => {
        const selectedTruck = trucks.find((truck) => truck.id === truckId);
        setSelectedTruck(selectedTruck);

        setSelectedDate(datesArray[dayNumber]);

        handleServiceTaskModalShow();
    };

    const handleSelectDriver = (driver) => {
        setSelectedDriver(driver);
    };

    const handleSelectTask = ({ task, editMode, truckId, dayNumber }) => {
        setEditMode(editMode);
        console.log("Truck ID SELECTED", truckId);

        if (editMode) {
            setSelectedTask(task);
        }

        setSelectedDate(datesArray[dayNumber]);

        const selectedTruck = trucks.find((truck) => truck.id === truckId);
        if (selectedTruck) {
            setSelectedTruck(selectedTruck);
            console.log("Truck found:", selectedTruck);
        } else {
            console.log("Truck not found for id:", truckId);
        }
        // handleModalShow();
    };

    const handleEndTime = () => {
        console.log("Open End Time Modal");
        setShowEndTimeModal(true);
    };

    const handleStartTime = () => {
        console.log("Open Start Time Modal");
        setShowStartTimeModal(true);
    };

    const handleDeleteTask = async (e, taskId) => {
        e.stopPropagation();

        const isConfirmed = window.confirm(
            "Ви впевнені, що хочете видалити задачу?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axios.delete(`/api/tasks/delete/${taskId}/`);
            console.log("Task deleted successfully:", response.data);

            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error.message);
        }
    };

    const handleEditModeTask = (e, task) => {
        e.preventDefault();
        e.stopPropagation();

        setEditModeServiceTask(true);
        setSelectedTask(task);
        handleServiceTaskModalShow();

        console.log("THIS IS FROM EDIT TASK", task);
    };

    const handleShowDriver = () => {
        setShowDriver(!showDriver);
        setIsToggled(!isToggled);
    };

    return (
        <>
            <StartTimeModalComponent
                handleStartTime={handleStartTime}
                showStartTimeModal={showStartTimeModal}
                setShowStartTimeModal={setShowStartTimeModal}
                selectedTask={selectedTask}
                onTaskUpdate={handleTaskUpdate}
            />
            <EndTimeModalComponent
                handleEndTime={handleEndTime}
                showEndTimeModal={showEndTimeModal}
                setShowEndTimeModal={setShowEndTimeModal}
                selectedTask={selectedTask}
                onTaskUpdate={handleTaskUpdate}
            />
            <ServiceTaskModalComponent
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTruck={selectedTruck}
                setSelectedTruck={setSelectedTruck}
                selectedDriver={selectedDriver}
                setSelectedDriver={setSelectedDriver}
                handleSelectDriver={handleSelectDriver}
                selectedTaskType={selectedTaskType}
                setSelectedTaskType={setSelectedTaskType}
                handleServiceTaskModalClose={handleServiceTaskModalClose}
                showServiceTaskModal={showServiceTaskModal}
                setShowServiceTaskModal={setShowServiceTaskModal}
                handleTaskCreate={handleTaskCreate}
                handleTaskUpdate={handleTaskUpdate}
                selectedTask={selectedTask}
                editModeServiceTask={editModeServiceTask}
                setEditModeServiceTask={setEditModeServiceTask}
            />

            <div className="planner-container">
                <div className="week-number">
                    <div className="week-number__btn-add-route">
                        <Link to="/orders/add">
                            <div>Створити маршрут</div>
                        </Link>
                    </div>

                    <WeekSwitcherComponent
                        week={week}
                        handleWeekChange={handleWeekChange}
                    />
                    <div></div>
                    <SwitchComponent
                        isToggled={isToggled}
                        onToggle={handleShowDriver}
                    />
                </div>

                <hr className="divide-block" />
                <div className="table-body-container">
                    <div className="week">
                        <div className="week__day-list">
                            <div className="week-header__row">
                                <div className="week-header__day-container">
                                    <div className="week-header__day-container_date-item">
                                        <div className="week-header__day-container_truck">
                                            Truck Plates
                                        </div>
                                    </div>
                                </div>
                                {datesArray.map(([day, date]) => {
                                    return (
                                        <div
                                            className="week-header__day-container"
                                            key={date}
                                        >
                                            <WeekDateComponent
                                                day={day}
                                                date={date}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* rows with trucks */}
                            {trucks.map((truck) => {
                                // TODO - this part has to be learnt better
                                const weeklyTasks = datesArray.map((date) => {
                                    return tasks.filter((task) => {
                                        return (
                                            task.start_date === date[1] &&
                                            truck.plates === task.truck
                                        );
                                    });
                                });

                                return (
                                    <div
                                        className="week-truck__row"
                                        key={truck.id}
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="week-truck__day-container">
                                            <div className="week-truck__first-col">
                                                <div className="week-truck__plates with-icon-truck">
                                                    {truck.plates}
                                                </div>
                                                {truck.trailer && (
                                                    <div className="week-truck__trailer-plates with-icon-trailer">
                                                        {truck.trailer}
                                                    </div>
                                                )}
                                                {truck.driver_details && (
                                                    <div
                                                        className="week-truck__driver-details"
                                                        onClick={toggleDetails}
                                                    >
                                                        {
                                                            truck.driver_details
                                                                .full_name
                                                        }
                                                        {showDetails ? (
                                                            <FaAngleUp />
                                                        ) : (
                                                            <FaAngleDown />
                                                        )}
                                                    </div>
                                                )}
                                                {showDetails && (
                                                    <span className="week-truck__driver-details_phone-number">
                                                        {truck.driver &&
                                                            truck.driver_details
                                                                .phone_number}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {weeklyTasks.map(
                                            (dayTasks, dayNumber) => (
                                                <div
                                                    className="week-truck__day-container"
                                                    key={dayNumber}
                                                >
                                                    <DayTasks
                                                        showDriver={showDriver}
                                                        isHovered={isHovered}
                                                        tasks={dayTasks}
                                                        onTruckDateSelect={
                                                            handleTruckDateSelect
                                                        }
                                                        onSelect={
                                                            handleSelectTask
                                                        }
                                                        truckId={truck.id}
                                                        dayNumber={dayNumber}
                                                        setShowModal={
                                                            setShowModal
                                                        }
                                                        handleEndTime={
                                                            handleEndTime
                                                        }
                                                        handleStartTime={
                                                            handleStartTime
                                                        }
                                                        handleServiceTaskModalShow={
                                                            handleServiceTaskModalShow
                                                        }
                                                        handleDeleteTask={
                                                            handleDeleteTask
                                                        }
                                                        handleEditModeTask={
                                                            handleEditModeTask
                                                        }
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* <ModalItem
                            showModal={showModal}
                            onCloseModal={handleModalClose}
                            editMode={editMode}
                            data={selectedTask}
                            onTaskUpdate={handleTaskUpdate}
                            selectedDate={selectedDate}
                            selectedTruck={selectedTruck}
                            onTaskCreate={handleTaskCreate}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
};
