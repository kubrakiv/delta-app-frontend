import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "./AddTaskComponent.scss";
import AddTaskHeaderComponent from "./AddTaskHeaderComponent/AddTaskHeaderComponent";
import AddTaskFooterComponent from "./AddTaskFooterComponent/AddTaskFooterComponent";
import Map from "../Map/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import OpenContext from "../../components/OpenContext";
import { getCsrfToken } from "../../utils/getCsrfToken";

const { REACT_APP_API_KEY: API_KEY } = process.env;

function AddTaskComponent({
    selectedTask,
    order,
    selectedDate,
    selectedTruck,
    selectedDriver,
    selectedTaskType,
    setShowAddTaskModal,
    editModeTask,
    setEditModeTask,
    tasks,
    setTasks,
}) {
    const { defaultCenter, libraries } = useContext(OpenContext);
    const [center, setCenter] = useState(defaultCenter);
    const [csrfToken, setCsrfToken] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [truck, setTruck] = useState(selectedTruck || null);
    const [driver, setDriver] = useState(selectedDriver || null);
    const [taskType, setTaskType] = useState("");
    const [task, setTask] = useState({});
    const [point, setPoint] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [points, setPoints] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
        libraries: libraries,
    });
    useEffect(() => {
        if (selectedTask && editModeTask) {
            setTitle(
                selectedTask.title ||
                    selectedTask.point_details.country_short +
                        "-" +
                        selectedTask.point_details.postal_code +
                        " " +
                        selectedTask.point_details.city
            );
            setStartDate(selectedTask.start_date);
            setStartTime(selectedTask.start_time);
            setEndDate(selectedTask.end_date);
            setEndTime(selectedTask.end_time);
            setTruck(selectedTask.truck);
            setDriver(selectedTask.driver);
            setTaskType(selectedTask.type);
            setSelectedOption(selectedTask.point_details);
        }
    }, [selectedTask, editModeTask]);

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        async function fetchTrucks() {
            const { data } = await axios.get("/api/trucks/");
            setTrucks(data);
        }

        fetchTrucks();

        (async () => {
            const { data } = await axios.get("/api/drivers/");
            setDrivers(data);
        })();

        (async () => {
            const { data } = await axios.get("/api/points/");
            setPoints(data);
        })();

        (async () => {
            const { data } = await axios.get("/api/task-types/");
            setTaskTypes(data);
        })();
    }, []);

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

    // Alternative approach for handleTaskUpdate function

    // const handleTaskUpdate = (taskId, taskData) => {
    //     const updatedTasks = tasks.map((task) => {
    //         if (task.id === taskId) {
    //             return taskData;
    //         }

    //         return task;
    //     });
    //     console.log(updatedTasks, "this is updated tasks");
    //     setTasks(updatedTasks);
    // };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            start_date: startDate,
            start_time: startTime,
            end_date: endDate,
            end_time: endTime,
            truck: selectedTruck || truck,
            driver: selectedDriver || driver,
            order: order ? order.number : null,
            type: taskType,
            point_details: selectedOption,
            point_title: selectedOption.title,
        };
        console.log(data, "this is a DATA from the FORM in ADD TASK COMPONENT");

        if (order && !editModeTask) {
            task.order = order.number; // FIXME: check if this is right

            try {
                const responseTask = await axios.post(
                    `/api/tasks/create/`,
                    data
                );
                handleTaskCreate(responseTask.data);
                console.log(responseTask.data, "this is RESPONSE TASK DATA");
                setShowAddTaskModal(false);
            } catch (taskError) {
                console.error("Error creating task:", taskError.message);
            }
        }
        if (order && editModeTask) {
            task.order = order.number;

            try {
                const response = await axios.put(
                    `/api/tasks/edit/${selectedTask.id}/`,
                    data
                );

                handleTaskUpdate(selectedTask.id, response.data);
                setShowAddTaskModal(false);
                console.log("Task edited successfully:", response.data);
            } catch (taskError) {
                console.error("Error creating task:", taskError.message);
            }
        }
        if (!order) {
            data.id = uuidv4();
            handleTaskCreate(data);
            setShowAddTaskModal(false);
        }
    };

    useEffect(() => {
        console.log(tasks, "this is tasks from ADD TASK COMPONENT");
    }, [tasks]);

    useEffect(() => {
        if (selectedTruck) {
            setTruck(selectedTruck);
        }
        if (selectedDriver) {
            setDriver(selectedDriver);
        }
        console.log("selectedTruck change", "selectedDriver change");
    }, [selectedTruck, selectedDriver]);

    useEffect(() => {
        if (selectedOption) {
            setCenter({
                lat: selectedOption.gps_latitude,
                lng: selectedOption.gps_longitude,
            });
            setTitle(selectedOption.title);
        }
    }, [selectedOption]);

    // Convert API points to options format
    const options = points.map((point) => ({
        id: point.id,
        title: `${point.country_short}-${point.postal_code} ${point.city}`,
        value: point.city,
        label: `${point.country_short}-${point.postal_code} ${point.city}, ${point.street}, ${point.street_number}`,
        gps_latitude: parseFloat(point.gps_latitude),
        gps_longitude: parseFloat(point.gps_longitude),
    }));

    return (
        <>
            <div className="add-task-container">
                <div className="add-task-details">
                    {/* <AddTaskHeaderComponent
                        setShowAddTaskModal={setShowAddTaskModal}
                        editMode={editMode}
                    /> */}

                    <Form onSubmit={handleFormSubmit} className="add-task-form">
                        <div className="add-task-details__content">
                            <div className="add-task-details__content-block">
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="type"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Тип завдання
                                            </Form.Label>
                                            <Form.Select
                                                id="taskType"
                                                name="taskType"
                                                required
                                                value={
                                                    selectedTaskType ||
                                                    taskType ||
                                                    null
                                                }
                                                onChange={(e) =>
                                                    setTaskType(e.target.value)
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    // disabled
                                                >
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
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="title"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Завдання
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="title"
                                                placeholder="Введіть назву завдання"
                                                value={title}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="date"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Дата початку
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                placeholder="Enter task start date"
                                                value={startDate}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="time"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Час початку
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="time"
                                                placeholder="Enter task start time"
                                                value={startTime}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="date"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Дата завершення
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter task start date"
                                                value={endDate}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="time"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Час завершення
                                            </Form.Label>
                                            <Form.Control
                                                type="time"
                                                placeholder="Enter task start time"
                                                value={endTime}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="truck"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Автомобіль
                                            </Form.Label>
                                            <Form.Select
                                                id="truck"
                                                name="truck"
                                                value={truck}
                                                onChange={(e) =>
                                                    setTruck(e.target.value)
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    disabled
                                                >
                                                    Виберіть автомобіль
                                                </option>
                                                {Array.isArray(trucks) &&
                                                    trucks.map((truck) => (
                                                        <option
                                                            key={truck.id}
                                                            value={truck.plates}
                                                        >
                                                            {truck.plates}
                                                        </option>
                                                    ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <Form.Group
                                            controlId="driver"
                                            className="add-task-details__row-block"
                                        >
                                            <Form.Label className="add-task-details__form-title">
                                                Водій
                                            </Form.Label>
                                            <Form.Select
                                                id="driver"
                                                name="driver"
                                                value={driver}
                                                onChange={(e) =>
                                                    setDriver(e.target.value)
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    disabled
                                                >
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
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="add-task-details__content-block">
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <Form.Label className="add-task-details__form-title">
                                            Пункти
                                        </Form.Label>
                                        <div className="add-task-details__content-row-block_search">
                                            <Select
                                                className="add-task-details__row-block"
                                                value={selectedOption}
                                                onChange={(selected) =>
                                                    setSelectedOption(selected)
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

                        <AddTaskFooterComponent
                            setEditModeTask={setEditModeTask}
                            editModeTask={editModeTask}
                            setShowAddTaskModal={setShowAddTaskModal}
                        />
                    </Form>
                </div>
            </div>
        </>
    );
}

export default AddTaskComponent;
