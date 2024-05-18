export const transformDateFormat = (dateString) => {
    // Split the date string into year, month, and day
    const parts = dateString.split("-");

    // Rearrange the parts to form the desired format
    const transformedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

    return transformedDate;
};
