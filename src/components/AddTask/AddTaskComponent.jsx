import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useJsApiLoader } from "@react-google-maps/api";
import { getCsrfToken } from "../../utils/getCsrfToken";
import { listPoints } from "../../actions/pointActions";
import { listTaskTypes } from "../../actions/taskTypeActions";
import { setMapCurrentLocation } from "../../actions/mapActions";
import {
  listOrderDetails,
  setAddTaskMode,
  setShowTaskModal,
} from "../../actions/orderActions";
import { setMapOption } from "../../utils/setMapOption";
import { transformSelectOptions } from "../../utils/transformers";

import SelectComponent from "../../globalComponents/SelectComponent";
import Map from "../Map";
import Select from "react-select";
import AddTaskFooterComponent from "./AddTaskFooterComponent/AddTaskFooterComponent";
import InputComponent from "../../globalComponents/InputComponent";

import "./AddTaskComponent.scss";

import { TASK_CONSTANTS } from "../../constants/global";
import { createTask, updateTask } from "../../features/tasks/tasksOperations";

const { REACT_APP_API_KEY: API_KEY } = import.meta.env;

function AddTaskComponent({ onCloseModal, initialTaskData = null }) {
  const dispatch = useDispatch();

  const map = useSelector((state) => state.map);
  const currentLocation = useSelector((state) => state.map.currentLocation);
  const order = useSelector((state) => state.ordersInfo.order.data);
  const task = useSelector((state) => state.ordersInfo.task.data);
  const editModeTask = useSelector(
    (state) => state.ordersInfo.task.editModeTask
  );
  const addTaskMode = useSelector((state) => state.ordersInfo.addTaskMode);
  const trucks = useSelector((state) => state.trucksInfo.trucks.data);
  const drivers = useSelector((state) => state.driversInfo.drivers.data);
  const points = useSelector((state) => state.pointsInfo.points.data);
  const point = useSelector((state) => state.pointsInfo.point.data);
  const taskTypes = useSelector((state) => state.taskTypesInfo.taskTypes.data);

  const trucksOptions = transformSelectOptions(trucks, "plates");
  const driversOptions = transformSelectOptions(drivers, "full_name");
  const taskTypesOptions = transformSelectOptions(taskTypes, "name");

  const [tasks, setTasks] = useState(order.tasks || []);

  const [center, setCenter] = useState({});

  const [title, setTitle] = useState("");
  const [taskType, setTaskType] = useState("");
  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: map.libraries,
  });

  // Convert API points to options format
  const pointOptions = points.map((point) => setMapOption(point));

  const selectedOption = useMemo(() => setMapOption(point), [point]);

  // Set task data if in edit mode
  useEffect(() => {
    if (editModeTask) {
      setCenter(currentLocation);
      setTitle(task ? task.title : "");
      setStartDate(task ? task.start_date : "");
      setStartTime(task ? task.start_time : "");
      setEndDate(task ? task.end_date : "");
      setEndTime(task ? task.end_time : "");
      setTruck(task ? task.truck : "");
      setDriver(task ? task.driver : "");
      setTaskType(task ? task.type : "");
      setSelectedPoint(selectedOption);
    }
  }, [editModeTask, task, currentLocation, point, selectedOption]);

  useEffect(() => {
    if (addTaskMode) {
      setCenter("");
      setTitle("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setTruck(order.truck);
      setDriver(order.driver);
      setTaskType("");
      setSelectedPoint("");
    }
  }, [addTaskMode, order]);

  // Set selected point
  useEffect(() => {
    if (selectedPoint) {
      dispatch(
        setMapCurrentLocation({
          lat: parseFloat(selectedPoint.gps_latitude),
          lng: parseFloat(selectedPoint.gps_longitude),
        })
      );
      setTitle(selectedPoint.title);
    }
  }, [selectedPoint, dispatch]);

  // Fetch CSRF token
  useEffect(() => {
    getCsrfToken();
  }, []);

  // Fetch points and task types
  useEffect(() => {
    dispatch(listPoints());
    dispatch(listTaskTypes());
  }, [dispatch]);

  const handleTaskCreate = (taskData) => {
    setTasks((prevTasks) => [...prevTasks, taskData]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      truck: truck,
      driver: driver,
      order: order || order.number, // Create a new order reference
      type: taskType,
      point_details: selectedPoint,
      point_title: selectedPoint.title,
    };

    console.log("Data:", data);

    if (order && !editModeTask) {
      try {
        const newTask = { ...task, ...data, order: order.number };
        await dispatch(createTask(newTask)).unwrap();

        dispatch(listOrderDetails(order.id));
        dispatch(setAddTaskMode(false));
        dispatch(setShowTaskModal(false));
      } catch (taskError) {
        console.error("Error creating task:", taskError.message);
      }
    }
    if (order && editModeTask) {
      try {
        const updatedTask = { ...task, ...data, order: order.number };
        await dispatch(updateTask(updatedTask)).unwrap();

        dispatch(setAddTaskMode(false));
        dispatch(setShowTaskModal(false));
        dispatch(listOrderDetails(order.id));
      } catch (taskError) {
        console.error("Error creating task:", taskError.message);
      }
    }
    if (!order) {
      // For cases where no order exists, create a new task with a generated ID
      const newTaskWithoutOrder = { ...data, id: uuidv4() };
      handleTaskCreate(newTaskWithoutOrder);
      dispatch(setAddTaskMode(false));
      dispatch(setShowTaskModal(false));
    }
  };

  return (
    <>
      <div className="add-task-container">
        <div className="add-task-details">
          <form onSubmit={handleFormSubmit} className="add-task-form">
            <div className="add-task-details__content">
              <div className="add-task-details__content-block">
                <div className="add-task-details__row">
                  <div className="add-task-details__content-row-block">
                    <SelectComponent
                      label={"Тип завдання"}
                      title={"Виберіть тип завдання"}
                      key="taskType"
                      id="taskType"
                      name="taskType"
                      value={taskType || ""}
                      placeholder="Виберіть тип завдання"
                      onChange={(e) => setTaskType(e.target.value)}
                      options={taskTypesOptions}
                    />
                  </div>
                </div>
                <div className="add-task-details__row">
                  <div className="add-task-details__content-row-block">
                    <InputComponent
                      label={"Назва завдання"}
                      title={"Введіть назву завдання"}
                      placeholder="Введіть назву завдання"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="add-task-details__row">
                  <div className="add-task-details__content-row-block">
                    <InputComponent
                      label={"Дата початку"}
                      title={"Введіть дату початку"}
                      placeholder="Введіть дату початку"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="add-task-details__content-row-block">
                    <InputComponent
                      label={"Час початку"}
                      title={"Введіть час початку"}
                      placeholder="Введіть час початку"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="add-task-details__row">
                  <div className="add-task-details__content-row-block">
                    <InputComponent
                      label={"Дата завершення"}
                      title={"Введіть дату завершення"}
                      placeholder="Введіть дату завершення"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="add-task-details__content-row-block">
                    <InputComponent
                      label={"Час завершення"}
                      title={"Введіть час завершення"}
                      placeholder="Введіть час завершення"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="add-task-details__row">
                  <div className="add-task-details__content-row-block">
                    <SelectComponent
                      label={"Автомобіль"}
                      title={"Виберіть авто"}
                      key="truck"
                      id="truck"
                      name="truck"
                      value={truck || ""}
                      placeholder="Виберіть авто"
                      onChange={(e) => setTruck(e.target.value)}
                      options={trucksOptions}
                    />
                    {/* <div className="add-task-details__row-block">
                    </div> */}
                  </div>
                  <div className="add-task-details__content-row-block">
                    <SelectComponent
                      label={"Водій"}
                      title={"Виберіть водія"}
                      key="driver"
                      id="driver"
                      name="driver"
                      value={driver || ""}
                      placeholder="Виберіть водія"
                      onChange={(e) => setDriver(e.target.value)}
                      options={driversOptions}
                    />
                  </div>
                </div>
              </div>

              <div className="add-task-details__content-block">
                <div className="add-task-details__row">
                  <div className="add-task-details__content-row-block">
                    <label className="add-task-details__form-title">
                      Пункти
                    </label>
                    <div className="add-task-details__content-row-block_search">
                      <Select
                        className="add-task-details__row-block"
                        value={selectedPoint || ""}
                        onChange={(selected) => setSelectedPoint(selected)}
                        options={pointOptions}
                        isSearchable
                        placeholder="Пошук точки на карті..."
                        onMenuOpen={() => setIsDropdownOpen(true)}
                        onMenuClose={() => setIsDropdownOpen(false)}
                        menuIsOpen={isDropdownOpen}
                      />
                    </div>
                  </div>
                </div>
                <div className="add-task-details__row">
                  <div className="add-task-details__row-block">
                    <div className="add-task-details__content-row-block add-task-details__content-row-block-map">
                      {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddTaskFooterComponent onCloseModal={onCloseModal} />
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTaskComponent;
