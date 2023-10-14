import { getISOWeek } from "date-fns";
import { useState } from "react";
import "./WeekPlanner.scss";
import { generateDatesArray } from "./dateFunctions";

export const WeekPlanner = () => {
    const date = new Date();
    const [week, setWeek] = useState(getISOWeek(date));
    const [datesArray, setDatesArray] = useState(
        generateDatesArray(date, week)
    );

    const year = date.getFullYear();

    const handleWeekChange = (newWeek) => {
        setWeek(newWeek);
        setDatesArray(generateDatesArray(date, newWeek));
    };

    return (
        <>
            <h1>Week planner</h1>

            <div className="week-number">
                <div className="week-number__container">
                    <button
                        type="button"
                        className="week-number__btn"
                        onClick={() => handleWeekChange(week - 1)}
                    >
                        &lt;
                    </button>
                    <div className="week-number__number">{week}</div>
                    <button
                        type="button"
                        className="week-number__btn"
                        onClick={() => handleWeekChange(week + 1)}
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
