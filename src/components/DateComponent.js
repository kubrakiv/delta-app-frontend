import React from "react";

const DateComponent = ({ day, date }) => {
    return (
        <div className="day__header">
            <div className="day__name text-center">{day}</div>
            <div className="day__date text-center">{date}</div>
        </div>
    );
};

export default DateComponent;
