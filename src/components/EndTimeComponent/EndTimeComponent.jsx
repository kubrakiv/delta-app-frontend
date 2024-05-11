import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./EndTimeComponent.scss";
import EndTimeHeaderComponent from "./EndTimeHeaderComponent/EndTimeHeaderComponent";
import EndTimeFooterComponent from "./EndTimeFooterComponent/EndTimeFooterComponent";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";

const EndTimeComponent = ({
    setShowEndTimeModal,
    selectedTask,
    onTaskUpdate,
}) => {
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        getCsrfToken();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!endDate || !endTime) {
            return;
        }

        const data = {
            end_date: endDate,
            end_time: endTime,
        };

        if (data) {
            try {
                const responseTask = await axios.put(
                    `/api/tasks/edit/${selectedTask.id}/`,
                    data
                );

                setShowEndTimeModal(false);
                onTaskUpdate(selectedTask.id, responseTask.data);
            } catch (taskError) {
                console.log(taskError);
            }
        }
    };
    return (
        <>
            <div className="end-time-container">
                <div className="end-time">
                    <EndTimeHeaderComponent selectedTask={selectedTask} />
                    <Form onSubmit={handleFormSubmit} className="end-time-form">
                        <div className="end-time__content">
                            <div className="end-time__content-block">
                                <div className="end-time__row">
                                    <div className="end-time__content-row-block">
                                        <Form.Group
                                            controlId="date"
                                            className="end-time__row-block"
                                        >
                                            <Form.Label className="end-time__form-title">
                                                Дата завершення
                                            </Form.Label>
                                            <Form.Control
                                                required
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
                                    <div className="end-time__content-row-block">
                                        <Form.Group
                                            controlId="time"
                                            className="end-time__row-block"
                                        >
                                            <Form.Label className="end-time__form-title">
                                                Час завершення
                                            </Form.Label>
                                            <Form.Control
                                                required
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
                            </div>
                        </div>

                        <EndTimeFooterComponent
                            setShowEndTimeModal={setShowEndTimeModal}
                        />
                    </Form>
                </div>
            </div>
        </>
    );
};

export default EndTimeComponent;
