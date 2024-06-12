import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "./AddTaskComponent.scss";
import { useJsApiLoader } from "@react-google-maps/api";
import { getCsrfToken } from "../../utils/getCsrfToken";
import { getTaskTitle } from "../../utils/getTaskTitle";
import { listPoints } from "../../actions/pointActions";
import { listTaskTypes } from "../../actions/taskTypeActions";
import AddTaskFooterComponent from "./AddTaskFooterComponent/AddTaskFooterComponent";
import Map from "../Map";
import SelectComponent from "../../globalComponents/SelectComponent";
import { setMapCurrentLocation } from "../../actions/mapActions";
import { setAddTaskMode } from "../../actions/orderActions";
import { setMapOption } from "../../utils/setMapOption";
import { transformSelectOptions } from "../../utils/transformers";

const { REACT_APP_API_KEY: API_KEY } = process.env;

function AddTaskComponent() {
    const dispatch = useDispatch();

    const map = useSelector((state) => state.map);
    const currentLocation = useSelector((state) => state.map.currentLocation);
    const order = useSelector((state) => state.ordersInfo.order.data);
    const task = useSelector((state) => state.ordersInfo.task.data);
    const editMode = useSelector((state) => state.ordersInfo.task.editMode);
    const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);
    const trucks = useSelector((state) => state.trucksInfo.trucks.data);
    const drivers = useSelector((state) => state.driversInfo.drivers.data);
    const points = useSelector((state) => state.pointsInfo.points.data);
    const point = useSelector((state) => state.pointsInfo.point.data);
    const taskTypes = useSelector(
        (state) => state.taskTypesInfo.taskTypes.data
    );

    const trucksOptions = transformSelectOptions(trucks, "plates");

    const [tasks, setTasks] = useState(order.tasks || []);
    const [selectedTask, setSelectedTask] = useState(task);

    const [center, setCenter] = useState({});
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [truck, setTruck] = useState("");
    const [driver, setDriver] = useState("");
    const [taskType, setTaskType] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
        libraries: map.libraries,
    });

    // Convert API points to options format
    const options = points.map((point) => setMapOption(point));

    const selectedOption = useMemo(() => setMapOption(point), [point]);

    // Set task data if in edit mode
    useEffect(() => {
        if (editMode) {
            setCenter(currentLocation);
            setTitle(task ? task.title : "");
            setStartDate(task ? task.start_date : "");
            setStartTime(task ? task.start_time : "");
            setEndDate(task ? task.end_date : "");
            setEndTime(task ? task.end_time : "");
            setTruck(task ? task.truck : "");
            setDriver(task ? task.driver : "");
            setTaskType(task ? task.type : "");
            setSelectedPoint(selectedOption);
        }
    }, [editMode, task, currentLocation, point, selectedOption]);

    useEffect(() => {
        if (addTaskMode) {
            setCenter("");
            setTitle("");
            setStartDate("");
            setStartTime("");
            setEndDate("");
            setEndTime("");
            setTruck(order.truck);
            setDriver(order.driver);
            setTaskType("");
            setSelectedPoint("");
        }
    }, [addTaskMode, order]);

    // Set selected point
    useEffect(() => {
        if (selectedPoint) {
            dispatch(
                setMapCurrentLocation({
                    lat: parseFloat(selectedPoint.gps_latitude),
                    lng: parseFloat(selectedPoint.gps_longitude),
                })
            );
            setTitle(selectedPoint.title);
        }
    }, [selectedPoint, dispatch]);

    // Fetch CSRF token
    useEffect(() => {
        getCsrfToken();
    }, []);

    // Fetch points and task types
    useEffect(() => {
        dispatch(listPoints());
        dispatch(listTaskTypes());
    }, [dispatch]);

    const handleTaskCreate = (taskData) => {
        setTasks((prevTasks) => [...prevTasks, taskData]);
    };

    const handleTaskUpdate = (taskId, taskData) => {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            const taskIndex = newTasks.findIndex((task) => task.id === taskId);
            newTasks[taskIndex] = taskData;
            return newTasks;
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            start_date: startDate,
            start_time: startTime,
            end_date: endDate,
            end_time: endTime,
            truck: truck,
            driver: driver,
            order: order ? order.number : null,
            type: taskType,
            point_details: selectedPoint,
            point_title: selectedPoint.title,
        };

        if (order && !editMode) {
            task.order = order.number; // FIXME: check if this is right

            try {
                const responseTask = await axios.post(
                    `/api/tasks/create/`,
                    data
                );
                handleTaskCreate(responseTask.data);
                console.log(responseTask.data, "this is RESPONSE TASK DATA");
                dispatch(setAddTaskMode(false));
            } catch (taskError) {
                console.error("Error creating task:", taskError.message);
            }
        }
        if (order && editMode) {
            task.order = order.number;

            try {
                const response = await axios.put(
                    `/api/tasks/edit/${selectedTask.id}/`,
                    data
                );

                handleTaskUpdate(selectedTask.id, response.data);
                dispatch(setAddTaskMode(false));
                console.log("Task edited successfully:", response.data);
            } catch (taskError) {
                console.error("Error creating task:", taskError.message);
            }
        }
        if (!order) {
            data.id = uuidv4();
            handleTaskCreate(data);
            dispatch(setAddTaskMode(false));
        }
    };

    return (
        <>
            <div className="add-task-container">
                <div className="add-task-details">
                    <Form onSubmit={handleFormSubmit} className="add-task-form">
                        <div className="add-task-details__content">
                            <div className="add-task-details__content-block">
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Тип завдання
                                        </label>
                                        <select
                                            key="taskType"
                                            id="taskType"
                                            name="taskType"
                                            value={taskType}
                                            className="form-field__select form-select-mb10"
                                            onChange={(e) =>
                                                setTaskType(e.target.value)
                                            }
                                        >
                                            <option value={""} disabled>
                                                Виберіть тип завдання
                                            </option>
                                            {taskTypes.map((taskType) => (
                                                <option
                                                    key={taskType.id}
                                                    value={taskType.name}
                                                >
                                                    {taskType.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Назва завдання
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Введіть назву завдання"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            className="form-field__input form-select-mb5"
                                        />
                                    </div>
                                </div>

                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Дата початку
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            placeholder="Enter task start date"
                                            value={startDate}
                                            className="form-field__input form-select-mb5"
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Час початку
                                        </label>
                                        <input
                                            required
                                            type="time"
                                            placeholder="Enter task start time"
                                            value={startTime}
                                            className="form-field__input form-select-mb5"
                                            onChange={(e) =>
                                                setStartTime(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Дата завершення
                                        </label>
                                        <input
                                            type="date"
                                            placeholder="Enter task start date"
                                            value={endDate}
                                            className="form-field__input form-select-mb5"
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Час завершення
                                        </label>
                                        <input
                                            type="time"
                                            placeholder="Enter task start time"
                                            value={endTime}
                                            className="form-field__input form-select-mb5"
                                            onChange={(e) =>
                                                setEndTime(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <div className="add-task-details__row-block">
                                            <SelectComponent
                                                label={"Автомобіль"}
                                                title={"Виберіть авто"}
                                                key="truck"
                                                id="truck"
                                                name="truck"
                                                value={truck}
                                                placeholder="Виберіть авто"
                                                onChange={(e) =>
                                                    setTruck(e.target.value)
                                                }
                                                options={trucksOptions}
                                            />
                                        </div>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Водій
                                        </label>
                                        <select
                                            id="driver"
                                            name="driver"
                                            value={driver}
                                            className="form-field__select form-select-mb10"
                                            onChange={(e) =>
                                                setDriver(e.target.value)
                                            }
                                        >
                                            <option value={null} disabled>
                                                Виберіть водія
                                            </option>
                                            {drivers.map((driver) => (
                                                <option
                                                    key={driver.id}
                                                    value={driver.full_name}
                                                >
                                                    {driver.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="add-task-details__content-block">
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <label className="add-task-details__form-title">
                                            Пункти
                                        </label>
                                        <div className="add-task-details__content-row-block_search">
                                            <Select
                                                className="add-task-details__row-block"
                                                value={selectedPoint}
                                                onChange={(selected) =>
                                                    setSelectedPoint(selected)
                                                }
                                                options={options}
                                                isSearchable
                                                placeholder="Пошук точки на карті..."
                                                onMenuOpen={() =>
                                                    setIsDropdownOpen(true)
                                                }
                                                onMenuClose={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                                menuIsOpen={isDropdownOpen}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__row-block">
                                        <div className="add-task-details__content-row-block add-task-details__content-row-block-map">
                                            {isLoaded ? (
                                                <Map center={center} />
                                            ) : (
                                                <h2>Loading...</h2>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <AddTaskFooterComponent />
                    </Form>
                </div>
            </div>
        </>
    );
}

export default AddTaskComponent;
