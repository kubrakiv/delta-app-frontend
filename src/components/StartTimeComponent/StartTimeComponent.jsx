import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./StartTimeComponent.scss";
import StartTimeHeaderComponent from "./StartTimeHeaderComponent/StartTimeHeaderComponent";
import StartTimeFooterComponent from "./StartTimeFooterComponent/StartTimeFooterComponent";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";

const StartTimeComponent = ({
    setShowStartTimeModal,
    selectedTask,
    onTaskUpdate,
}) => {
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        setStartDate(selectedTask.start_date);
        setStartTime(selectedTask.start_time);
    }, [selectedTask]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!startDate || !startTime) {
            return;
        }

        const data = {
            start_date: startDate,
            start_time: startTime,
        };

        if (data) {
            try {
                const responseTask = await axios.put(
                    `/api/tasks/edit/${selectedTask.id}/`,
                    data
                );

                setShowStartTimeModal(false);
                onTaskUpdate(selectedTask.id, responseTask.data);
            } catch (taskError) {
                console.log(taskError);
            }
        }
    };
    return (
        <>
            <div className="start-time-container">
                <div className="start-time">
                    <StartTimeHeaderComponent selectedTask={selectedTask} />
                    <Form
                        onSubmit={handleFormSubmit}
                        className="start-time-form"
                    >
                        <div className="start-time__content">
                            <div className="start-time__content-block">
                                <div className="start-time__row">
                                    <div className="start-time__content-row-block">
                                        <Form.Group
                                            controlId="date"
                                            className="start-time__row-block"
                                        >
                                            <Form.Label className="start-time__form-title">
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
                                    <div className="start-time__content-row-block">
                                        <Form.Group
                                            controlId="time"
                                            className="start-time__row-block"
                                        >
                                            <Form.Label className="start-time__form-title">
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
                            </div>
                        </div>

                        <StartTimeFooterComponent
                            setShowStartTimeModal={setShowStartTimeModal}
                        />
                    </Form>
                </div>
            </div>
        </>
    );
};

export default StartTimeComponent;
