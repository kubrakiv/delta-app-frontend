import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getISOWeek } from "date-fns";
import "./WeekPlanner.scss";
import { generateDatesArray } from "./dateFunctions";

import DayTasks from "../Tasks/DayTasks";
import { Link } from "react-router-dom";
import WeekSwitcherComponent from "../WeekSwitcherComponent/WeekSwitcherComponent";
import WeekDateComponent from "../WeekDateComponent/WeekDateComponent";
import EndTimeModalComponent from "./EndTimeModalComponent/EndTimeModalComponent";
import StartTimeModalComponent from "./StartTimeModalComponent/StartTimeModalComponent";
import ServiceTaskModalComponent from "./ServiceTaskModalComponent/ServiceTaskModalComponent";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import { FaAngleDown, FaAngleUp, FaTrailer, FaTruck } from "react-icons/fa";
import { setPlanner } from "../../actions/plannerActions";
import { listTrucks } from "../../actions/truckActions";
import { listDrivers } from "../../actions/driverActions";
import { listTaskTypes } from "../../actions/taskTypeActions";
import { listTasks } from "../../actions/taskActions";
import { setTaskListData } from "../../reducers/taskReducers";

export const WeekPlanner = () => {
    const dispatch = useDispatch();
    const showDriver = useSelector((state) => state.plannerInfo.showDriver);
    const showOrderNumber = useSelector(
        (state) => state.plannerInfo.showOrderNumber
    );
    const showCustomer = useSelector((state) => state.plannerInfo.showCustomer);
    const trucks = useSelector((state) => state.trucksInfo.trucks.data);
    const tasks = useSelector((state) => state.tasksInfo.tasks.data);

    console.log("TRUCKS", trucks);

    const date = new Date();
    const [isHovered, setHovered] = useState(false);

    const [showDetails, setShowDetails] = useState(false);

    // const [tasks, setTasks] = useState([]);
    const [week, setWeek] = useState(getISOWeek(date));
    const [datesArray, setDatesArray] = useState(
        generateDatesArray(date, week)
    );
    const [showModal, setShowModal] = useState(false);
    const [isToggledDriver, setIsToggledDriver] = useState(false);
    const [isToggledOrderNumber, setIsToggledOrderNumber] = useState(false);
    const [isToggledCustomer, setIsToggledCustomer] = useState(false);
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
        dispatch(setTaskListData(updatedTasks));
        // setTasks(updatedTasks);
    };

    const handleTaskCreate = (taskData) => {
        // setTasks((prevTasks) => [...prevTasks, taskData]);
        dispatch(setTaskListData([...tasks, taskData]));
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
        dispatch(listTrucks());
        dispatch(listDrivers());
        dispatch(listTaskTypes());
        dispatch(listTasks());
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
            dispatch(setTaskListData(updatedTasks));
            // setTasks(updatedTasks);
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

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleShowDriver = () => {
        dispatch(setPlanner({ showDriver: !showDriver }));
        setIsToggledDriver(!isToggledDriver);
    };

    const handleShowOrderNumber = () => {
        dispatch(setPlanner({ showOrderNumber: !showOrderNumber }));
        setIsToggledOrderNumber(!isToggledOrderNumber);
    };

    const handleShowCustomer = () => {
        dispatch(setPlanner({ showCustomer: !showCustomer }));
        setIsToggledCustomer(!isToggledCustomer);
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
                        title="Показати водія"
                        isToggled={isToggledDriver}
                        onToggle={handleShowDriver}
                    />
                    <SwitchComponent
                        title="Показати номер заявки"
                        isToggled={isToggledOrderNumber}
                        onToggle={handleShowOrderNumber}
                    />
                    <SwitchComponent
                        title="Показати замовника"
                        isToggled={isToggledCustomer}
                        onToggle={handleShowCustomer}
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
                                    >
                                        <div className="week-truck__day-container">
                                            <div className="week-truck__first-col">
                                                <div className="week-truck__truck-plates">
                                                    <span className="week-truck__truck-plates_icon">
                                                        {<FaTruck />}
                                                    </span>
                                                    <span>{truck.plates}</span>
                                                </div>
                                                {truck.trailer && (
                                                    <div className="week-truck__trailer-plates">
                                                        <span className="week-truck__trailer-plates_icon">
                                                            {<FaTrailer />}
                                                        </span>
                                                        <span>
                                                            {truck.trailer}
                                                        </span>
                                                    </div>
                                                )}
                                                {truck?.driver_details && (
                                                    <div
                                                        className="week-truck__driver-details"
                                                        onClick={toggleDetails}
                                                    >
                                                        {
                                                            truck
                                                                ?.driver_details
                                                                ?.full_name
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
                                                        {truck?.driver &&
                                                            truck
                                                                ?.driver_details
                                                                ?.phone_number}
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
                    </div>
                </div>
            </div>
        </>
    );
};
