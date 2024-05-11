import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";
import { Form } from "react-bootstrap";
import AddServiceTaskFooterComponent from "./AddServiceTaskFooterComponent/AddServiceTaskFooterComponent";

const AddServiceTaskComponent = ({
    selectedTask,
    selectedDate,
    setSelectedDate,
    selectedTruck,
    setSelectedTruck,
    selectedDriver,
    handleSelectDriver,
    selectedTaskType,
    setSelectedTaskType,
    showServiceTaskModal,
    setShowServiceTaskModal,
    handleTaskCreate,
    handleTaskUpdate,
    editModeServiceTask,
    setEditModeServiceTask,
}) => {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [truck, setTruck] = useState(selectedTruck || null);
    const [driver, setDriver] = useState(selectedDriver || null);
    const [taskType, setTaskType] = useState("");

    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);

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
            const { data } = await axios.get("/api/task-types/");
            setTaskTypes(data);
        })();
    }, []);

    useEffect(() => {
        if (selectedTask && editModeServiceTask) {
            setTaskType(selectedTask.type);
            setTitle(selectedTask.title);
            setStartDate(selectedTask.start_date);
            setStartTime(selectedTask.start_time);
            setEndDate(selectedTask.end_date);
            setEndTime(selectedTask.end_time);
            setTruck(selectedTask.truck);
            setDriver(selectedTask.driver);
        }
        console.log("EDIT MODE", editModeServiceTask);
    }, [selectedTask, editModeServiceTask]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!editModeServiceTask) {
            const data = {
                title: title,
                start_date: selectedDate[1],
                start_time: startTime,
                end_date: endDate,
                end_time: endTime,
                truck: selectedTruck.plates,
                driver: selectedDriver,
                type: selectedTaskType,
            };
            console.log(data, "this is ADD MODE SERVICE TASK DATA");

            try {
                const response = await axios.post("/api/tasks/create/", data);
                console.log("Task created:", response.data);
                handleTaskCreate(response.data);
                setShowServiceTaskModal(false);
            } catch (error) {
                console.error("Error creating task:", error);
            }
        }

        if (editModeServiceTask) {
            const data = {
                title: title,
                start_date: startDate,
                start_time: startTime,
                end_date: endDate,
                end_time: endTime,
                truck: truck,
                driver: driver,
                type: taskType,
            };
            console.log(data, "this is EDIT MODE SERVICE TASK DATA");

            try {
                const response = await axios.put(
                    `/api/tasks/edit/${selectedTask.id}/`,
                    data
                );

                handleTaskUpdate(selectedTask.id, response.data);
                setShowServiceTaskModal(false);
                setEditModeServiceTask(false);
                console.log("Task edited successfully:", response.data);
            } catch (taskError) {
                console.error("Error creating task:", taskError.message);
            }
        }
    };

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
                                                    editModeServiceTask
                                                        ? taskType
                                                        : selectedTaskType
                                                }
                                                onChange={(e) =>
                                                    setSelectedTaskType(
                                                        e.target.value
                                                    )
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
                                                value={
                                                    editModeServiceTask
                                                        ? title
                                                        : null
                                                }
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
                                                value={
                                                    (selectedDate &&
                                                        selectedDate[1]) ||
                                                    startDate ||
                                                    null
                                                }
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setSelectedDate(
                                                        e.target.value
                                                    )
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
                                {(selectedTaskType &&
                                    selectedTaskType === "Завантаження") ||
                                    (selectedTaskType === "Розвантаження" && (
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
                                                            setEndDate(
                                                                e.target.value
                                                            )
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
                                                            setEndTime(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    ))}
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
                                                value={
                                                    editModeServiceTask
                                                        ? truck
                                                        : selectedTruck.plates
                                                }
                                                onChange={(e) =>
                                                    setSelectedTruck(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    // disabled
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
                                                value={
                                                    editModeServiceTask
                                                        ? driver
                                                        : selectedDriver
                                                }
                                                onChange={(e) =>
                                                    handleSelectDriver(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    // disabled
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
                        </div>

                        <AddServiceTaskFooterComponent
                            showServiceTaskModal={showServiceTaskModal}
                            setShowServiceTaskModal={setShowServiceTaskModal}
                        />
                    </Form>
                </div>
            </div>
        </>
    );
};

export default AddServiceTaskComponent;
