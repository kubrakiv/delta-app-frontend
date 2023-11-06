import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./AddTaskComponent.scss";

function AddTaskComponent({
    selectedDate,
    selectedTruck,
    onCloseModal,
    onTaskCreate,
}) {
    const [csrfToken, setCsrfToken] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [truck, setTruck] = useState("");
    const [driver, setDriver] = useState("");
    const [type, setTaskType] = useState("");
    const [order, setOrder] = useState("");

    const [trucks, setTrucks] = useState("");

    useEffect(() => {
        async function fetchTrucks() {
            const { data } = await axios.get("/api/trucks/");
            setTrucks(data);
        }

        fetchTrucks();
    }, []);

    useEffect(() => {
        axios
            .get("/api/csrf-token/")
            .then((response) => {
                setCsrfToken(response.data.csrfToken);
                console.log(response.data.csrfToken, "csrf token");
            })
            .catch((error) => {
                console.error("Error fetching CSRF token:", error);
            });
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            start_date: selectedDate[1],
            start_time: time,
            truck: selectedTruck.plates,
            driver: driver,
            order: order,
            type: type,
        };
        console.log(
            selectedTruck,
            selectedDate,
            order,
            title,
            type,
            date,
            time,
            truck,
            "this is task data for creation"
        );

        try {
            const response = await axios.post("/api/tasks/create/", data, {
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            });

            onTaskCreate(response.data);
            onCloseModal();
            console.log("Task created successfully:", response.data);
        } catch (error) {
            console.error("Error creating task:", error.message);
        }
    };
    console.log(truck, "re-render");

    return (
        <div className="form-container" style={{ maxWidth: "600px" }}>
            {/* <h1 className="form-name">Task creation</h1> */}
            <Form onSubmit={handleFormSubmit} className="add-task-form">
                <Form.Group controlId="title">
                    <Form.Label className="add-task-form__title">
                        Title
                    </Form.Label>
                    <Form.Control
                        required
                        type="title"
                        placeholder="Enter task title"
                        value={title}
                        className="add-task-form__input"
                        onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="date" className="add-task-form__group">
                    <Form.Label className="form__title">Start Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Enter task start date"
                        // value={formatDate(new Date(selectedDate))}
                        value={selectedDate[1]}
                        className="add-task-form__input"
                        onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="time" className="add-task-form__group">
                    <Form.Label className="add-task-form__title">
                        Start Time
                    </Form.Label>
                    <Form.Control
                        required
                        type="time"
                        placeholder="Enter task start time"
                        value={time}
                        className="add-task-form__input"
                        onChange={(e) => setTime(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="truck" className="add-task-form__group">
                    <Form.Label className="add-task-form__title">
                        Truck
                    </Form.Label>
                    <Form.Select
                        id="truck"
                        name="truck"
                        onChange={(e) => setTruck(e.target.value)}
                    >
                        {/* <option value={truck_num}>{truck_num}</option> */}

                        {Array.isArray(trucks) &&
                            trucks.map((truck) => (
                                <option
                                    key={truck.id}
                                    value={truck.plates}
                                    selected={truck.id === selectedTruck.id}
                                >
                                    {truck.plates}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="driver" className="add-task-form__group">
                    <Form.Label className="add-task-form__title">
                        Driver
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter task driver"
                        value={driver}
                        className="add-task-form__input"
                        onChange={(e) => setDriver(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="type" className="add-task-form__group">
                    <Form.Label className="add-task-form__title">
                        Type
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter task type"
                        value={type}
                        className="add-task-form__input"
                        onChange={(e) => setTaskType(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="order" className="add-task-form__group">
                    <Form.Label className="add-task-form__title">
                        Order
                    </Form.Label>
                    <Form.Control
                        // required
                        type="text"
                        placeholder="Enter task order"
                        value={order}
                        className="add-task-form__input"
                        onChange={(e) => setOrder(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" className="add-task-form__button">
                    ADD TASK
                </Button>
            </Form>
        </div>
    );
}

export default AddTaskComponent;
