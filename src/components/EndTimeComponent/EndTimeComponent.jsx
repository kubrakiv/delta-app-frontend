import React, { useEffect, useState } from "react";
import "./EndTimeComponent.scss";
import EndTimeHeaderComponent from "./EndTimeHeaderComponent/EndTimeHeaderComponent";
import axios from "axios";
import { getCsrfToken } from "../../utils/getCsrfToken";
import InputComponent from "../../globalComponents/InputComponent";

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
                    <form onSubmit={handleFormSubmit} className="end-time-form">
                        <div className="end-time__content">
                            <div className="end-time__content-block">
                                <div className="end-time__row">
                                    <div className="end-time__content-row-block">
                                        <div className="end-time__row-block">
                                            <InputComponent
                                                label={"Дата завершення"}
                                                required
                                                type="date"
                                                placeholder="Enter task start date"
                                                value={endDate}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="end-time__content-row-block">
                                        <div className="end-time__row-block">
                                            <InputComponent
                                                label={"Час завершення"}
                                                required
                                                type="time"
                                                placeholder="Enter task start time"
                                                value={endTime}
                                                className="add-task-form__input"
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EndTimeComponent;
