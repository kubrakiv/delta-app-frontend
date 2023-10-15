import { getISOWeek } from "date-fns";
import { useState } from "react";
import "./WeekPlanner.scss";
// import { generateDatesArray, formatDate } from "./dateFunctions";

export const WeekPlanner = () => {
    const date = new Date();
    const weekNumber = getISOWeek(date);

    const [week, setWeek] = useState(weekNumber);
    S
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentDate = date.getDate(); // день місяця
    const weekDayNumber = date.getDay(); // день тижня

    const monthStart = 1;
    const monthEnd = new Date(year, month, 0).getDate();

    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weekStartDate = currentDate - weekDayNumber + 

    return (
        <>
            <h1>Week planner</h1>

            <div className="week-number">
                <div className="week-number__container">
                    <button
                        type="button"
                        className="week-number__btn"
                        onClick={() => setWeek(week - 1)}
                    >
                        &lt;
                    </button>
                    <div className="week-number__number">{week}</div>
                    <button
                        type="button"
                        className="week-number__btn"
                        onClick={() => setWeek(week + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <div className="week">
                <div className="week__day-list">
                    <div className="row">
                        {datesArray.map(([day, date]) => (
                            <div className="col week__day-container">
                                <div className="week__day text-center">
                                    {day}
                                </div>
                                <div className="week__date text-center">
                                    {date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
