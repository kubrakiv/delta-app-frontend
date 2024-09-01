import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./EditTaskComponent.scss";

function EditTaskComponent({ task, onTaskUpdate, onCloseModal }) {
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

    useEffect(() => {
        setTitle(task.title || "");
        setDate(task.start_date || "");
        setTime(task.start_time || "");
        setTruck(task.truck || "");
        setDriver(task.driver || "");
        setTaskType(task.type || "");
        setOrder(task.order || "");
    }, [task]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: title,
            start_date: date,
            start_time: time,
            truck: truck,
            driver: driver,
            type: type,
            order: order,
        };

        console.log(data, "this is TASK EDIT DATA");

        try {
            const response = await axios.put(
                `/api/tasks/edit/${task.id}/`,
                data,
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                }
            );

            onTaskUpdate(task.id, response.data);
            onCloseModal();
            console.log("Task edited successfully:", response.data);
        } catch (error) {
            console.error("Error creating task:", error.message);
        }
    };

    return (
        <Container style={{ maxWidth: "400px" }}>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>
                        Title (Order {task.order ? `${task.order}` : ""})
                    </Form.Label>
                    <Form.Control
                        required
                        type="title"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="date">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Enter task start date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="date">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        required
                        type="time"
                        placeholder="Enter task start time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="truck">
                    <Form.Label>Truck</Form.Label>
                    <Form.Select
                        type="text"
                        value={truck}
                        onChange={(e) => setTruck(e.target.value)}
                    >
                        {Array.isArray(trucks) &&
                            trucks.map((truck) => (
                                <option key={truck.id} value={truck.plates}>
                                    {truck.plates}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="driver">
                    <Form.Label>Driver</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter task driver"
                        value={driver}
                        onChange={(e) => setDriver(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter task type"
                        value={type}
                        onChange={(e) => setTaskType(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="order">
                    <Form.Label>Order</Form.Label>
                    <Form.Control
                        // required
                        type="text"
                        placeholder="Enter order number"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="edit-task-form__button"
                >
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default EditTaskComponent;
