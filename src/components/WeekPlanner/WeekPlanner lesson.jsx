import { getISOWeek } from "date-fns";
import { useState } from "react";
import "./WeekPlanner.scss";
// import { generateDatesArray, formatDate } from "./dateFunctions";

export const WeekPlanner = () => {
    const date = new Date();
    const weekNumber = getISOWeek(date);

    const [week, setWeek] = useState(weekNumber);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentDate = date.getDate();
    const weekDayNumber = date.getDay();

    const monthStart = 1;
    const monthEnd = new Date(year, month, 0).getDate();

    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weekStartDate = currentDate - weekDayNumber + 1;

    const datesArray = Array.from(
        { length: 7 },
        (_, i) =>
            `${year}-${month}-${
                i + weekStartDate < 10
                    ? "" + i + weekStartDate
                    : i + weekStartDate
            }`
    ).map((d, i) => [weekDayNames[i], d]);

    console.log(datesArray, "thisis dates array");

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
