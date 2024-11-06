import { v4 as uuidv4 } from "uuid";
import { transformDate } from "../../../utils/formatDate";

const getTruckDetails = (truck) => [
  {
    id: uuidv4(),
    title: "Марка",
    value: `${truck.brand} ${truck.model}`,
  },
  {
    id: uuidv4(),
    title: "Державний номер",
    value: truck.plates,
  },
  {
    id: uuidv4(),
    title: "Рік випуску",
    value: truck.year,
  },
  {
    id: uuidv4(),
    title: "VIN номер",
    value: truck.vin_code,
  },
  {
    id: uuidv4(),
    title: "Дата введення в експлуатацію",
    value: truck.entry_date ? transformDate(truck.entry_date) : "Не вказано",
  },
  {
    id: uuidv4(),
    title: "Дата вибуття з експлуатації",
    value: truck.end_date ? transformDate(truck.end_date) : "Не вказано",
  },
  {
    id: uuidv4(),
    title: "Пробіг при введенні, км",
    value: truck.entry_mileage,
  },
  {
    id: uuidv4(),
    title: "Ціна, EUR",
    value: truck.price,
  },
];

export default getTruckDetails;
