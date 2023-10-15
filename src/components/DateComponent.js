import React from "react";

const DateComponent = ({ date }) => {
    const formattedDate = formatDate(date); // You can use your formatting logic

    return (
        <div className="date-component">
            <h5>{formattedDate}</h5>
        </div>
    );
};

const formatDate = (date) => {
    try {
        const [year, month, day] = date.split("-");
        // return `${getWeekDayName(new Date(date))} ${day}-${month}-${year}`;
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
};

const getWeekDayName = (date) => {
    try {
        const options = { weekday: "short" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
        console.error("Error getting week day name:", error);
        return "Unknown Day";
    }
};

export default DateComponent;
