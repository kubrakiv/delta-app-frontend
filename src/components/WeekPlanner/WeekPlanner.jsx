import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { getISOWeek, parseISO, getYear } from "date-fns";
import { generateDatesArray } from "./dateFunctions";

import { FaAngleDown, FaAngleUp, FaTrailer, FaTruck } from "react-icons/fa";

import {
  setSwitchers,
  setSelectedTask,
  setShowStartTimeModal,
  setShowEndTimeModal,
  setShowServiceTaskModal,
  setEditModeServiceTask,
  setSelectedTruck,
  setSelectedDriver,
  setSelectedDate,
  setAddModeServiceTask,
} from "../../features/planner/plannerSlice";

import {
  selectSwitchers,
  selectSelectedTask,
} from "../../features/planner/plannerSelectors";

import { listDrivers } from "../../actions/driverActions";
import { listTaskTypes } from "../../actions/taskTypeActions";
import { deleteTask, listTasks } from "../../features/tasks/tasksOperations";
import { selectTrucks } from "../../features/trucks/trucksSelectors";
import { listTrucks } from "../../features/trucks/trucksOperations";
import { selectTasks } from "../../features/tasks/tasksSelectors";

import DayTasks from "../Tasks/DayTasks";
import WeekSwitcherComponent from "../WeekSwitcherComponent/WeekSwitcherComponent";
import WeekDateComponent from "../WeekDateComponent/WeekDateComponent";
import EndTimeModalComponent from "./EndTimeModalComponent/EndTimeModalComponent";
import StartTimeModalComponent from "./StartTimeModalComponent/StartTimeModalComponent";
import ServiceTaskModalComponent from "./ServiceTaskModalComponent/ServiceTaskModalComponent";
import SwitchComponent from "../SwitchComponent/SwitchComponent";

import "./WeekPlanner.scss";

export const WeekPlanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentYear = parseInt(searchParams.get("year")) || getYear(new Date());
  const currentWeek =
    parseInt(searchParams.get("week")) || getISOWeek(new Date());

  const [week, setWeek] = useState(currentWeek);
  const [year, setYear] = useState(currentYear);

  const { showDriver, showOrderNumber, showCustomer } =
    useSelector(selectSwitchers);

  const trucks = useSelector(selectTrucks);
  const tasks = useSelector(selectTasks);

  const date = new Date();

  const [showDetails, setShowDetails] = useState(false);

  const [datesArray, setDatesArray] = useState(generateDatesArray(date, week));
  const [isToggledDriver, setIsToggledDriver] = useState(false);
  const [isToggledOrderNumber, setIsToggledOrderNumber] = useState(false);
  const [isToggledCustomer, setIsToggledCustomer] = useState(false);

  useEffect(() => {
    dispatch(listTrucks());
    dispatch(listDrivers());
    dispatch(listTaskTypes());
    dispatch(listTasks());
  }, []);

  const handleWeekChange = (newWeek) => {
    setWeek(newWeek);
    navigate(`/planner?year=${year}&week=${newWeek}`);
    setDatesArray(generateDatesArray(date, newWeek));
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
    navigate(`/planner?year=${newYear}&week=${week}`);
  };
  const filterTasksForWeek = (tasks, week) => {
    return tasks.filter((task) => {
      const taskWeek = getISOWeek(parseISO(task.start_date));
      return taskWeek === week;
    });
  };

  const handleTruckDateSelect = ({ truckId, dayNumber }) => {
    const truck = trucks.find((truck) => truck.id === truckId);

    dispatch(setSelectedTruck(truck));
    dispatch(setSelectedDate(datesArray[dayNumber]));
    dispatch(setSelectedDriver(truck.driver_details));
    dispatch(setShowServiceTaskModal(true));
  };

  const handleEditModeTask = (e, task) => {
    e.preventDefault();

    dispatch(setSelectedTask(task));
    dispatch(setEditModeServiceTask(true));
    dispatch(setShowServiceTaskModal(true));
  };

  const handleStartTime = (task) => {
    dispatch(setShowStartTimeModal(true));
    dispatch(setSelectedTask(task));
  };

  const handleEndTime = (task) => {
    dispatch(setShowEndTimeModal(true));
    dispatch(setSelectedTask(task));
  };

  const handleDeleteTask = async (e, taskId) => {
    e.stopPropagation();

    const isConfirmed = window.confirm(
      "Ви впевнені, що хочете видалити задачу?"
    );

    if (!isConfirmed) {
      return;
    }

    dispatch(deleteTask(taskId));
  };

  // Show driver phone number
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleShowDriver = () => {
    dispatch(setSwitchers({ showDriver: !showDriver }));
    setIsToggledDriver(!isToggledDriver);
  };

  const handleShowOrderNumber = () => {
    dispatch(setSwitchers({ showOrderNumber: !showOrderNumber }));
    setIsToggledOrderNumber(!isToggledOrderNumber);
  };

  const handleShowCustomer = () => {
    dispatch(setSwitchers({ showCustomer: !showCustomer }));
    setIsToggledCustomer(!isToggledCustomer);
  };

  return (
    <>
      <StartTimeModalComponent />
      <EndTimeModalComponent />
      <ServiceTaskModalComponent />

      <div className="planner-container">
        <div className="week-number">
          <div className="week-number__btn-add-route">
            <Link to="/orders/add">
              <div>Створити маршрут</div>
            </Link>
          </div>

          <WeekSwitcherComponent
            year={year}
            week={week}
            handleWeekChange={handleWeekChange}
            handleYearChange={handleYearChange}
          />
          <div></div>
          <SwitchComponent
            title="Показати водія"
            isToggled={isToggledDriver}
            onToggle={handleShowDriver}
          />
          <SwitchComponent
            title="Показати номер заявки"
            isToggled={isToggledOrderNumber}
            onToggle={handleShowOrderNumber}
          />
          <SwitchComponent
            title="Показати замовника"
            isToggled={isToggledCustomer}
            onToggle={handleShowCustomer}
          />
        </div>

        <hr className="divide-block" />
        <div className="table-body-container">
          <div className="week">
            <div className="week__day-list">
              <div className="week-header__row">
                <div className="week-header__day-container">
                  <div className="week-header__day-container_date-item">
                    <div className="week-header__day-container_truck">
                      Truck Plates
                    </div>
                  </div>
                </div>
                {datesArray.map(([day, date]) => {
                  return (
                    <div className="week-header__day-container" key={date}>
                      <WeekDateComponent day={day} date={date} />
                    </div>
                  );
                })}
              </div>

              {trucks.map((truck) => {
                const weeklyTasks = datesArray.map((date) =>
                  filterTasksForWeek(
                    tasks.filter(
                      (task) =>
                        task.start_date === date[1] &&
                        truck.plates === task.truck
                    ),
                    week
                  )
                );

                return (
                  <div className="week-truck__row" key={truck.id}>
                    <div className="week-truck__day-container">
                      <div className="week-truck__first-col">
                        <div className="week-truck__truck-plates">
                          <span className="week-truck__truck-plates_icon">
                            {<FaTruck />}
                          </span>
                          <span>{truck.plates}</span>
                        </div>
                        {truck.trailer && (
                          <div className="week-truck__trailer-plates">
                            <span className="week-truck__trailer-plates_icon">
                              {<FaTrailer />}
                            </span>
                            <span>{truck.trailer}</span>
                          </div>
                        )}
                        {truck?.driver_details && (
                          <div
                            className="week-truck__driver-details"
                            onClick={toggleDetails}
                          >
                            {truck?.driver_details?.full_name}
                            {showDetails ? <FaAngleUp /> : <FaAngleDown />}
                          </div>
                        )}
                        {showDetails && (
                          <span className="week-truck__driver-details_phone-number">
                            {truck?.driver &&
                              truck?.driver_details?.phone_number}
                          </span>
                        )}
                      </div>
                    </div>

                    {weeklyTasks.map((dayTasks, dayNumber) => (
                      <div
                        className="week-truck__day-container"
                        key={dayNumber}
                      >
                        <DayTasks
                          tasks={dayTasks}
                          truckId={truck.id}
                          dayNumber={dayNumber}
                          onTruckDateSelect={handleTruckDateSelect}
                          handleEndTime={handleEndTime}
                          handleStartTime={handleStartTime}
                          handleDeleteTask={handleDeleteTask}
                          handleEditModeTask={handleEditModeTask}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
