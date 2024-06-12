import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";
import InputComponent from "../../globalComponents/InputComponent";
import SelectComponent from "../../globalComponents/SelectComponent";
import { transformSelectOptions } from "../../utils/transformers";
import Select from "react-select";

import { useSelector } from "react-redux";
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
    const trucks = useSelector((state) => state.trucksInfo.trucks.data);
    const drivers = useSelector((state) => state.driversInfo.drivers.data);
    const taskTypes = useSelector(
        (state) => state.taskTypesInfo.taskTypes.data
    );

    const trucksOptions = transformSelectOptions(trucks, "plates");
    const driversOptions = transformSelectOptions(drivers, "full_name");
    const taskTypesOptions = transformSelectOptions(taskTypes, "name");

    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [truck, setTruck] = useState(selectedTruck || null);
    const [driver, setDriver] = useState("");
    const [taskType, setTaskType] = useState("");
    // const [selectedDriver, setSelectedDriver] = useState("");

    useEffect(() => {
        if (selectedTruck) {
            handleSelectDriver(selectedTruck.driver);
        }
        if (selectedTruck.driver === null) {
            handleSelectDriver(null);
            console.log("DRIVER", selectedTruck.driver);
        }
    }, [selectedTruck, handleSelectDriver]);

    console.log("SELECTED TRUCK", selectedTruck);
    console.log("SELECTED DRIVER", selectedDriver);

    useEffect(() => {
        getCsrfToken();
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
            console.log("Data", data);

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
                    <form onSubmit={handleFormSubmit} className="add-task-form">
                        <div className="add-task-details__content">
                            <div className="add-task-details__content-block">
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <div
                                            controlId="type"
                                            className="add-task-details__row-block"
                                        >
                                            <SelectComponent
                                                label={"Тип завдання"}
                                                title={"Виберіть тип завдання"}
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
                                                options={taskTypesOptions}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <div className="add-task-details__row-block">
                                            <InputComponent
                                                label={"Завдання"}
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
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <div
                                            controlId="date"
                                            className="add-task-details__row-block"
                                        >
                                            <InputComponent
                                                label={"Дата початку"}
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
                                            />
                                        </div>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <div className="add-task-details__row-block">
                                            <InputComponent
                                                label={"Час початку"}
                                                required
                                                type="time"
                                                placeholder="Enter task start time"
                                                value={startTime}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {(selectedTaskType &&
                                    selectedTaskType === "Завантаження") ||
                                    (selectedTaskType === "Розвантаження" && (
                                        <div className="add-task-details__row">
                                            <div className="add-task-details__content-row-block">
                                                <div className="add-task-details__row-block">
                                                    <InputComponent
                                                        label={
                                                            "Дата завершення"
                                                        }
                                                        type="date"
                                                        placeholder="Enter task start date"
                                                        value={endDate}
                                                        className="add-task-form__input"
                                                        onChange={(e) =>
                                                            setEndDate(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="add-task-details__content-row-block">
                                                <div className="add-task-details__row-block">
                                                    <InputComponent
                                                        label={"Час завершення"}
                                                        type="time"
                                                        placeholder="Enter task start time"
                                                        value={endTime}
                                                        className="add-task-form__input"
                                                        onChange={(e) =>
                                                            setEndTime(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <div className="add-task-details__row">
                                    <div className="add-task-details__content-row-block">
                                        <div className="add-task-details__row-block">
                                            <SelectComponent
                                                label={"Автомобіль"}
                                                title={"Виберіть автомобіль"}
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
                                                options={trucksOptions}
                                            />
                                        </div>
                                    </div>
                                    <div className="add-task-details__content-row-block">
                                        <div
                                            controlId="driver"
                                            className="add-task-details__row-block"
                                        >
                                            <SelectComponent
                                                label={"Водій"}
                                                title={"Виберіть водія"}
                                                id="driver"
                                                name="driver"
                                                value={selectedDriver || null} // FIXME: when selectedDriver is null it should display the title
                                                onChange={(e) =>
                                                    handleSelectDriver(
                                                        e.target.value
                                                    )
                                                }
                                                options={driversOptions}
                                            />
                                            {/* <label className="upload-documents__form-title">
                                                {"Водій"}
                                            </label>
                                            <Select
                                                name={"driver"}
                                                // className="add-task-details__row-block_select"
                                                placeholder={"Виберіть водія"}
                                                value={selectedDriver}
                                                defaultValue={selectedDriver}
                                                onChange={(e) =>
                                                    handleSelectDriver(
                                                        e.target.value
                                                    )
                                                }
                                                options={driversOptions}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AddServiceTaskFooterComponent
                            handleSelectDriver={handleSelectDriver}
                            handleFormSubmit={handleFormSubmit}
                            setShowServiceTaskModal={setShowServiceTaskModal}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddServiceTaskComponent;
