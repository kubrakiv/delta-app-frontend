import React from "react";

const WeekSwitcherComponent = ({ week, handleWeekChange }) => {
    return (
        <>
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
        </>
    );
};

export default WeekSwitcherComponent;
