export const transformDateFormat = (dateString) => {
  // Split the date string into year, month, and day
  const parts = dateString.split("-");

  // Rearrange the parts to form the desired format
  const transformedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

  return transformedDate;
};

export const transformDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const formatDateForInput = (value) => {
  return value?.split("T")[0];
};
