import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useContext,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import "./AddOrder.scss";
import TaskOrder from "../../components/Task/TaskOrder";
import { FaArrowLeft, FaRegUser, FaTruckMoving } from "react-icons/fa";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import { ModalItem } from "../ModalItem/ModalItem";
import AddOrderCustomerManagerComponent from "./AddOrderCustomerManagerComponent/AddOrderCustomerManagerComponent";
import AddOrderModalComponent from "../AddTask/AddTaskModalComponent/AddTaskModalComponent";
import AddTaskModalComponent from "../AddTask/AddTaskModalComponent/AddTaskModalComponent";
import AddOrderResponsibleManagerComponent from "./AddOrderResponsibleManagerComponent/AddOrderResponsibleManagerComponent";
import AddPointModalComponent from "../AddPoint/AddPointModalComponent/AddPointModalComponent";
import TaskComponent from "../../screens/OrderPage/TaskComponent/TaskComponent";
import { DirectionsService, useJsApiLoader } from "@react-google-maps/api";
import Map from "../Map/Map";
import OpenContext from "../../components/OpenContext";
import { formatDuration } from "../../utils/formatDuration";
import { getCsrfToken } from "../../utils/getCsrfToken";
import { getUserDetails } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const { REACT_APP_API_KEY: API_KEY } = process.env;

function AddOrder() {
    const { libraries, defaultCenter } = useContext(OpenContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [center, setCenter] = useState(defaultCenter);

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const [editModeOrder, setEditModeOrder] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editModeTask, setEditModeTask] = useState(false);

    const [order, setOrder] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [points, setPoints] = useState([]);

    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const [truck, setTruck] = useState(null);
    const [driver, setDriver] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [price, setPrice] = useState("");
    const [marketPrice, setMarketPrice] = useState("");
    const [paymentDays, setPaymentDays] = useState("");
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [selectedPaymentType, setSelectedPaymentType] = useState(null);
    const [orderNumber, setOrderNumber] = useState("");
    const [selectedCustomerManagerName, setSelectedCustomerManagerName] =
        useState("");
    const [cargoName, setCargoName] = useState("");
    const [cargoWeight, setCargoWeight] = useState("");
    const [cargoLoadingType, setCargoLoadingType] = useState("");
    const [trailerType, setTrailerType] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedCustomerManager, setSelectedCustomerManager] =
        useState(null);
    const [selectedPoint, setSelectedPoint] = useState({});

    const [customerManagersList, setCustomerManagersList] = useState([]);

    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState("");

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
        libraries: libraries,
    });

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserDetails(userInfo.id));
        }
    }, [dispatch, userInfo]);

    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const point1 = new window.google.maps.LatLng(lat1, lng1);
        const point2 = new window.google.maps.LatLng(lat2, lng2);
        return window.google.maps.geometry.spherical.computeDistanceBetween(
            point1,
            point2
        );
    };

    async function calculateRoute(origin, destination) {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: origin,
            destination: destination,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDistance(results.routes[0].legs[0].distance.text);
    }

    const handleTaskUpdate = (taskId, taskData) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return taskData;
            }
            return task;
        });
        console.log(updatedTasks, "this is updated tasks");
        setTasks(updatedTasks);
    };

    const handleTaskCreate = (taskData) => {
        setTasks((prevTasks) => [...prevTasks, taskData]);
    };

    const handlePointCreate = (pointData) => {
        setPoints((prevPoints) => [...prevPoints, pointData]);
    };

    const handleAddTaskReset = () => {
        setSelectedTruck(null);
    };

    const handleAddTaskButtonClick = (e) => {
        e.stopPropagation();
        setShowAddTaskModal(true);
    };

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getCsrfToken();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        calculateRoute(
            {
                lat: tasks[0].point_details.gps_latitude,
                lng: tasks[0].point_details.gps_longitude,
            },
            {
                lat: tasks[1].point_details.gps_latitude,
                lng: tasks[1].point_details.gps_longitude,
            }
        );
        console.log(distance, "this is distance");

        let dataOrder = {
            user: user.id,
            truck: selectedTruck,
            price: parseFloat(price),
            market_price: parseFloat(marketPrice),
            payment_period: parseInt(paymentDays),
            payment_type: selectedPaymentType,
            driver: selectedDriver,
            customer: selectedCustomer,
            distance: parseInt(distance.replace(" km", "")),
            customer_manager: selectedCustomerManager,
            cargo_name: cargoName,
            cargo_weight: cargoWeight,
            loading_type: cargoLoadingType,
            trailer_type: trailerType,
            order_number: orderNumber,
            platform: selectedPlatform,
        };
        console.log(dataOrder, "this is dataOrder");

        try {
            const responseOrder = await axios.post(
                `/api/orders/create/`,
                dataOrder
            );
            setOrder(responseOrder.data);
            console.log("Order CREATED successfully:", responseOrder.data);

            // Processing the task sequentially
            for (const task of tasks) {
                task.order = responseOrder.data.number;
                try {
                    const responseTask = await axios.post(
                        `/api/tasks/create/`,
                        task
                    );
                    handleTaskCreate(responseTask.data);
                } catch (taskError) {
                    console.error("Error creating task:", taskError.message);
                }
            }

            navigate(`/orders/${responseOrder.data.id}/`);
        } catch (error) {
            console.error("Error creating order:", error.message);
        }
    };

    useEffect(() => {
        async function fetchTrucks() {
            const { data } = await axios.get("/api/trucks/");
            setTrucks(data);
        }

        fetchTrucks();
    }, []);

    useEffect(() => {
        async function fetchDrivers() {
            const { data } = await axios.get("/api/drivers/");
            setDrivers(data);
        }

        fetchDrivers();
    }, []);

    useEffect(() => {
        async function fetchCustomers() {
            const { data } = await axios.get("/api/customers/");
            setCustomers(data);
        }

        fetchCustomers();
    }, []);

    useEffect(() => {
        async function fetchPlatforms() {
            const { data } = await axios.get("/api/platforms/");
            setPlatforms(data);
        }

        fetchPlatforms();
    }, []);

    useEffect(() => {
        async function fetchPaymentTypes() {
            const { data } = await axios.get("/api/payment-types/");
            setPaymentTypes(data);
        }

        fetchPaymentTypes();
    }, []);

    useEffect(() => {
        const targetCustomer = customers.find(
            (customer) => customer.name === selectedCustomer
        );
        setCustomerManagersList(targetCustomer ? targetCustomer.managers : []);
        setSelectedCustomerManager(null);
    }, [customers, selectedCustomer]);

    const handleSelectTask = ({ task, editMode }) => {
        setEditMode(editMode);

        if (editMode) {
            setSelectedTask(task);
        }

        handleModalShow();
    };

    const handleShowPointOnMap = (task) => {
        if (task && task.point_details) {
            const { gps_latitude, gps_longitude } = task.point_details;
            if (gps_latitude !== undefined && gps_longitude !== undefined) {
                setCenter({
                    lat: parseFloat(gps_latitude),
                    lng: parseFloat(gps_longitude),
                });
            } else {
                console.error("Latitude or longitude is undefined");
            }
        } else {
            console.error("Invalid order or missing details");
        }
    };

    const handleEditModeTask = (e, task) => {
        e.preventDefault();
        e.stopPropagation();
        setEditModeTask(true);
        setSelectedTask(task);
        setShowAddTaskModal(true);
    };

    const handleDeleteTask = async (e, taskId) => {
        e.preventDefault();
        e.stopPropagation();

        const taskToDelete = tasks.find((task) => task.id === taskId);
        if (taskToDelete) {
            console.log("Task deleted:", taskToDelete);

            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        } else {
            console.log("Task not found:", taskId);
        }
    };

    const directionsServiceOptions = useMemo(() => {
        const origin = {
            lat: parseFloat(
                tasks.length > 0 && tasks[0].point_details.gps_latitude
            ),
            lng: parseFloat(
                tasks.length > 0 && tasks[0].point_details.gps_longitude
            ),
        };

        const destination = {
            lat: parseFloat(
                tasks.length > 0 &&
                    tasks[tasks.length - 1].point_details.gps_latitude
            ),
            lng: parseFloat(
                tasks.length > 0 &&
                    tasks[tasks.length - 1].point_details.gps_longitude
            ),
        };

        const waypoints =
            tasks &&
            tasks.slice(1, -1).map((task) => ({
                location: {
                    lat: parseFloat(
                        tasks.length > 0 && task.point_details.gps_latitude
                    ),
                    lng: parseFloat(
                        tasks.length > 0 && task.point_details.gps_longitude
                    ),
                },
                stopover: true,
            }));

        return {
            origin,
            destination,
            travelMode: "DRIVING",
            waypoints,
        };
    }, [tasks]);

    const directionsCallback = useCallback(
        (response) => {
            if (response !== null) {
                if (response.status === "OK") {
                    setDirectionsResponse(response);

                    const totalDistanceMeters = response.routes[0].legs.reduce(
                        (total, leg) => total + leg.distance.value,
                        0
                    );

                    const totalDistanceKm =
                        (totalDistanceMeters / 1000).toFixed(0) + " km";

                    setDistance(totalDistanceKm);

                    const totalDurationSeconds = response.routes[0].legs.reduce(
                        (total, leg) => total + leg.duration.value,
                        0
                    );

                    const totalDurationFormatted =
                        formatDuration(totalDurationSeconds);

                    setDuration(totalDurationFormatted);
                } else {
                    console.log("response: ", response);
                }
            }
        },
        [setDirectionsResponse, setDistance, setDuration]
    );

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <AddTaskModalComponent
                onAddTaskReset={handleAddTaskReset}
                selectedTruck={selectedTruck}
                setSelectedTruck={setSelectedTruck}
                selectedDriver={selectedDriver}
                setSelectedDriver={setSelectedDriver}
                selectedPoint={selectedPoint}
                setSelectedPoint={setSelectedPoint}
                showAddTaskModal={showAddTaskModal}
                setShowAddTaskModal={setShowAddTaskModal}
                editMode={editMode}
                editModeTask={editModeTask}
                setEditModeTask={setEditModeTask}
                tasks={tasks}
                setTasks={setTasks}
                onPointCreate={handlePointCreate}
            />
            <div className="order-container">
                <div className="add-order-details">
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="add-order-details__header">
                            <div
                                className="add-order-details__return-button"
                                onClick={handleGoBack}
                            >
                                <FaArrowLeft />
                            </div>
                            <div className="add-order-details__header-block">
                                Маршрут № {order.number}
                            </div>
                            {tasks.length > 0 && (
                                <div className="add-order-details__header-block">
                                    {tasks
                                        .map(
                                            (task) =>
                                                `${task.point_details.country_short}-${task.point_details.postal_code} ${task.point_details.city}`
                                        )
                                        .join(" - ")}
                                </div>
                            )}

                            <div className="add-order-details__header-block">
                                <div className="add-order-details__header-block_order-number">
                                    Заявка
                                </div>
                                <Form.Control
                                    id="orderNumber"
                                    name="orderNumber"
                                    value={orderNumber}
                                    placeholder="Номер заявки замовника"
                                    onChange={(e) =>
                                        setOrderNumber(e.target.value)
                                    }
                                ></Form.Control>
                            </div>
                        </div>
                        <div className="add-order-details__actions">
                            <button
                                type="button"
                                className="add-order-details__action-add-task-btn"
                                onClick={handleAddTaskButtonClick}
                            >
                                Додати завдання
                            </button>

                            {/* <button
                                type="button"
                                className="add-order-details__action"
                            >
                                <Link to="/orders-list">Documents</Link>
                            </button> */}
                        </div>

                        <div className="add-order-details__content">
                            <div className="add-order-details__content-block">
                                <div className="add-order-details__content-row">
                                    <div className="add-order-details__content-row-block">
                                        <div className="add-order-details__content-row-block-title">
                                            Перевізник
                                        </div>
                                        <div className="add-order-details__content-row-block-value">
                                            Delta Logistics SRO
                                        </div>
                                    </div>
                                    {/* <AddOrderResponsibleManagerComponent /> */}
                                </div>
                                <div className="add-order-details__content-row">
                                    <div className="add-order-details__content-row-block">
                                        <div className="add-order-details__content-row-block-title">
                                            Автомобіль
                                        </div>

                                        {editModeOrder && (
                                            <Form.Select
                                                id="truck"
                                                name="truck"
                                                value={selectedTruck}
                                                onChange={(e) =>
                                                    setSelectedTruck(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    // disabled
                                                >
                                                    Select truck
                                                </option>
                                                {trucks.map((truck) => (
                                                    <option key={truck.id}>
                                                        {truck.plates}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    </div>

                                    <div className="add-order-details__content-row-block">
                                        <div className="add-order-details__content-row-block-title">
                                            Водій
                                        </div>
                                        {editModeOrder && (
                                            <Form.Select
                                                id="driver"
                                                name="driver"
                                                value={selectedDriver}
                                                onChange={(e) =>
                                                    setSelectedDriver(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    // disabled
                                                >
                                                    Select driver
                                                </option>
                                                {Array.isArray(drivers) &&
                                                    drivers.map((driver) => (
                                                        <option
                                                            key={driver.id}
                                                            value={
                                                                driver.full_name
                                                            }
                                                        >
                                                            {driver.full_name}
                                                        </option>
                                                    ))}
                                            </Form.Select>
                                        )}
                                    </div>
                                </div>
                                {tasks.length > 0 && (
                                    <div className="add-order-details__content-row">
                                        <div className="add-order-details__content-row-block">
                                            <TaskComponent
                                                tasks={tasks}
                                                setTasks={setTasks}
                                                handleShowPointOnMap={
                                                    handleShowPointOnMap
                                                }
                                                handleEditModeTask={
                                                    handleEditModeTask
                                                }
                                                handleDeleteTask={
                                                    handleDeleteTask
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="add-order-details__content-block">
                                <div className="add-order-details__content-row">
                                    <div className="add-order-details__content-row-block">
                                        <div className="add-order-details__content-row-block-title">
                                            Тариф
                                        </div>
                                        {editModeOrder && (
                                            <div className="add-order-details__price-form-container">
                                                <div className="add-order-details__form-col">
                                                    <Form.Control
                                                        id="price"
                                                        name="text"
                                                        className="add-order-details__price-form-container__form-input"
                                                        value={price}
                                                        placeholder="Тариф"
                                                        onChange={(e) =>
                                                            setPrice(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                    <Form.Control
                                                        id="price"
                                                        name="text"
                                                        className="add-order-details__price-form-container__form-input"
                                                        value={marketPrice}
                                                        placeholder="Ринковий тариф"
                                                        onChange={(e) =>
                                                            setMarketPrice(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                </div>
                                                <div className="add-order-details__form-col">
                                                    <Form.Control
                                                        id="paymentDays"
                                                        name="number"
                                                        className="add-order-details__price-form-container__form-input"
                                                        value={paymentDays}
                                                        placeholder="Дні оплати"
                                                        onChange={(e) =>
                                                            setPaymentDays(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                    <Form.Select
                                                        id="payment-type"
                                                        name="payment-type"
                                                        className="add-order-details__price-form-container__form-input"
                                                        value={
                                                            selectedPaymentType
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPaymentType(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value={null}
                                                            selected
                                                            // disabled
                                                        >
                                                            Тип оплати
                                                        </option>
                                                        {paymentTypes.map(
                                                            (paymentType) => (
                                                                <option
                                                                    key={
                                                                        paymentType.id
                                                                    }
                                                                >
                                                                    {
                                                                        paymentType.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="add-order-details__content-row-block">
                                        <div className="add-order-details__content-row-block-title">
                                            Замовник
                                        </div>
                                        <Form.Select
                                            id="customer"
                                            name="customer"
                                            value={selectedCustomer}
                                            onChange={(e) =>
                                                setSelectedCustomer(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option
                                                value={null}
                                                selected
                                                disabled
                                            >
                                                Select customer
                                            </option>

                                            {Array.isArray(customers) &&
                                                customers.map((customer) => (
                                                    <option key={customer.id}>
                                                        {customer.name}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                        <div className="add-order-details__content-row-block-title">
                                            Платформа
                                        </div>

                                        {editModeOrder && (
                                            <Form.Select
                                                id="platform"
                                                name="platform"
                                                value={selectedPlatform}
                                                onChange={(e) =>
                                                    setSelectedPlatform(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={null}
                                                    selected
                                                    // disabled
                                                >
                                                    Select platform
                                                </option>
                                                {platforms.map((platform) => (
                                                    <option key={platform.id}>
                                                        {platform.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    </div>
                                </div>
                                <div className="add-order-details__content-row">
                                    <div className="add-order-details__content-row-block">
                                        <div className="add-order-details__content-row-block-title">
                                            Вантаж
                                        </div>
                                        {editModeOrder && (
                                            <div className="add-order-details__cargo-form-container">
                                                <div className="add-order-details__form-col">
                                                    <Form.Control
                                                        id="weight"
                                                        name="weight"
                                                        placeholder="Вага"
                                                        className="add-order-details__cargo-form-container__form-input"
                                                        value={cargoWeight}
                                                        onChange={(e) =>
                                                            setCargoWeight(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                    <Form.Control
                                                        id="cargoName"
                                                        name="cargoName"
                                                        placeholder="Назва вантажу"
                                                        className="add-order-details__cargo-form-container__form-input"
                                                        value={cargoName}
                                                        onChange={(e) =>
                                                            setCargoName(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                </div>
                                                <div className="add-order-details__form-col">
                                                    <Form.Control
                                                        id="bodyType"
                                                        name="bodyType"
                                                        placeholder="Тип кузова"
                                                        className="add-order-details__cargo-form-container__form-input"
                                                        value={trailerType}
                                                        onChange={(e) =>
                                                            setTrailerType(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                    <Form.Control
                                                        id="loadingType"
                                                        name="loadingType"
                                                        placeholder="Тип завантаження"
                                                        className="add-order-details__cargo-form-container__form-input"
                                                        value={cargoLoadingType}
                                                        onChange={(e) =>
                                                            setCargoLoadingType(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <AddOrderCustomerManagerComponent
                                        selectedCustomerManager={
                                            selectedCustomerManager
                                        }
                                        setSelectedCustomerManager={
                                            setSelectedCustomerManager
                                        }
                                        customerManagersList={
                                            customerManagersList
                                        }
                                    />
                                </div>
                                <div className="add-order-details__content-row">
                                    {tasks.length > 0 && (
                                        <div className="order-details__content-row-block order-details__content-row-block-map">
                                            {isLoaded ? (
                                                <>
                                                    <DirectionsService
                                                        options={
                                                            directionsServiceOptions
                                                        }
                                                        callback={
                                                            directionsCallback
                                                        }
                                                    />
                                                    <Map
                                                        tasks={tasks}
                                                        center={center}
                                                        directionsResponse={
                                                            directionsResponse
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <h2>Loading...</h2>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="add-order-details__footer">
                            <button
                                className="add-order-details__footer-btn add-order-details__footer-btn_save"
                                type="submit"
                            >
                                Записати
                            </button>
                            <button
                                className="add-order-details__footer-btn add-order-details__footer-btn_close"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <Link to="/orders-list">
                                    <div>Закрити</div>
                                </Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddOrder;
