import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { setEditModeDocument } from "../../../reducers/documentReducers";
import {
  setAddTaskMode,
  setSelectedDriver,
  setSelectedTruck,
} from "../../../actions/orderActions";

import {
  FaCalendarAlt,
  FaCopy,
  FaFileAlt,
  FaFolder,
  FaTimes,
  FaTrash,
  FaTruckMoving,
  FaUserCog,
} from "react-icons/fa";
import { selectTrucks } from "../../../features/trucks/trucksSelectors";
import { transformSelectOptions } from "../../../utils/transformers";

import SelectComponent from "../../../globalComponents/SelectComponent";

import "./style.scss";

const OrderActionsComponent = ({
  onDelete,
  selectedDriver,
  selectedTruck,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const dispatch = useDispatch();
  const editModeDocument = useSelector((state) => state.documentsInfo.editMode);

  const trucks = useSelector(selectTrucks);
  const drivers = useSelector((state) => state.driversInfo.drivers.data);

  const driverOptions = transformSelectOptions(drivers, "full_name");
  const truckOptions = transformSelectOptions(trucks, "plates");

  const [isDriverShow, setIsDriverShow] = useState(false);
  const [isTruckShow, setIsTruckShow] = useState(false);
  const [isCalendarShow, setIsCalendarShow] = useState(false);

  const handleDriverSelect = () => {
    setIsDriverShow(!isDriverShow);
    if (selectedDriver) {
      dispatch(setSelectedDriver(""));
    }
  };

  const handleTruckSelect = () => {
    setIsTruckShow(!isTruckShow);
    if (selectedTruck) {
      dispatch(setSelectedTruck(""));
    }
  };

  const handleCalendarSelect = () => {
    setIsCalendarShow(!isCalendarShow);
    if (!isCalendarShow) {
      onStartDateChange(null);
    }
  };

  const handleDocumentModalOpen = () => {
    dispatch(setEditModeDocument(!editModeDocument));
  };

  const handleAddTaskButtonClick = (e) => {
    e.stopPropagation();
    dispatch(setAddTaskMode(true));
  };

  return (
    <>
      <div className="order-actions order-details">
        <button
          className="order-actions__add-order-btn"
          onClick={handleAddTaskButtonClick}
          title="Додати маршрут"
        >
          <FaFileAlt />
        </button>
        <button
          className="order-actions__copy-order-btn"
          //   onClick={handleAddTaskButtonClick}
          title="Копіювати маршрут"
        >
          <FaCopy />
        </button>
        <button
          className="order-actions__add-documents-btn"
          onClick={handleDocumentModalOpen}
          title="Додати документи"
        >
          <FaFolder />
        </button>
        <button
          className="order-actions__find-driver-btn"
          onClick={handleDriverSelect}
          title="Вибрати водія"
        >
          <FaUserCog />
        </button>
        {isDriverShow && (
          <div className="order-actions__find-driver-select">
            <SelectComponent
              title="Виберіть водія"
              type="text"
              value={selectedDriver || ""}
              onChange={(e) => dispatch(setSelectedDriver(e.target.value))}
              options={driverOptions}
            />
          </div>
        )}
        {/* {selectedDriver && (
          <button
            className="order-actions__clear-btn"
            onClick={() => dispatch(setSelectedDriver(""))}
            title="Відмінити"
          >
            <FaTimes />
          </button>
        )} */}
        <button
          className="order-actions__find-truck-btn"
          onClick={handleTruckSelect}
          title="Вибрати тягач"
        >
          <FaTruckMoving />
        </button>

        {isTruckShow && (
          <div className="order-actions__find-driver-select">
            <SelectComponent
              title="Виберіть тягач"
              type="text"
              value={selectedTruck || ""}
              onChange={(e) => dispatch(setSelectedTruck(e.target.value))}
              options={truckOptions}
              className="styled-select-component"
            />
          </div>
        )}
        {selectedTruck && (
          <button
            className="order-actions__clear-btn"
            onClick={() => dispatch(setSelectedTruck(""))}
            title="Відмінити"
          >
            <FaTimes />
          </button>
        )}

        <button
          className="order-actions__calendar-btn"
          onClick={handleCalendarSelect}
          title="Вибрати період"
        >
          <FaCalendarAlt />
        </button>
        {isCalendarShow && (
          <div className="order-actions__date-filter">
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              placeholderText="Select Start Date"
              className="date-picker styled-date-picker"
              dateFormat="dd.MM.yyyy"
              isClearable
            />
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              placeholderText="Select End Date"
              className="date-picker styled-date-picker"
              dateFormat="dd.MM.yyyy"
              isClearable
            />
          </div>
        )}
        <button
          className="order-actions__delete-order-btn"
          onClick={onDelete}
          title="Видалити маршрут"
        >
          <FaTrash />
        </button>
      </div>
    </>
  );
};

export default OrderActionsComponent;
