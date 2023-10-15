import { getISOWeek } from "date-fns";

// Function to generate the array of dates based on the week number
export const generateDatesArray = (currentDate, currentWeek) => {
    const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weekStartDate =
        currentDate.getDate() -
        currentDate.getDay() +
        1 +
        (currentWeek - getISOWeek(currentDate)) * 7;

    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(currentDate);
        day.setDate(weekStartDate + i);
        return [weekDayNames[i], formatDate(day)];
    });
};

// Function to format the date as "YYYY-MM-DD"
export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
    }`;
};
