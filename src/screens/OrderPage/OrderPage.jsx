import React, {
    useState,
    useEffect,
    useContext,
    useMemo,
    useCallback,
    useReducer,
} from "react";
import axios from "axios";
import { useJsApiLoader, DirectionsService } from "@react-google-maps/api";
import "./OrderPage.scss";
import TruckComponent from "./TruckComponent/TruckComponent";
import DriverComponent from "./DriverComponent/DriverComponent";
import PriceComponent from "./PriceComponent/PriceComponent";
import CustomerComponent from "./CustomerComponent/CustomerComponent";
import CargoComponent from "./CargoComponent/CargoComponent";
import CustomerManagerComponent from "./CustomerManagerComponent/CustomerManagerComponent";
import TaskComponent from "./TaskComponent/TaskComponent";
import Map from "../../components/Map/Map";
import RouteComponent from "./RouteComponent/RouteComponent";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import CarrierComponent from "./CarrierComponent/CarrierComponent";
import CarrierManagerComponent from "./CarrierManagerComponent/CarrierManagerComponent";
import FooterComponent from "./FooterComponent/FooterComponent";

import OpenContext from "../../components/OpenContext";
import AddTaskModalComponent from "../../components/AddTask/AddTaskModalComponent/AddTaskModalComponent";
import DragAndDropTaskOrderComponent from "../../components/DragAndDropTaskOrderComponent/DragAndDropTaskOrderComponent";
import MarketPriceComponent from "./MarketPriceComponent/MarketPriceComponent";
import { getCsrfToken } from "../../utils/getCsrfToken";
import { formatDuration } from "../../utils/formatDuration";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { editModeReducer } from "./editModeReducer";
import UploadDocumentsModalComponent from "../../components/UploadDocumentsComponent/UploadDocumentsModalComponent/UploadDocumentsModalComponent";

const { REACT_APP_API_KEY: API_KEY } = process.env;

const initialEditModeState = {
    editMode: false,
    editModeOrderNumber: false,
    editModeTruck: false,
    editModePrice: false,
    editModeMarketPrice: false,
    editModeDriver: false,
    editModeCustomer: false,
    editModeCustomerManager: false,
    editModeCargo: false,
};

const OrderPage = ({ order }) => {
    const { editModeOrder, setEditModeOrder, libraries, defaultCenter } =
        useContext(OpenContext);

    console.log("OrderPage", order);

    const [editModeState, dispatch] = useReducer(
        editModeReducer,
        initialEditModeState
    );

    const [csrfToken, setCsrfToken] = useState("");
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [center, setCenter] = useState(defaultCenter);

    // All edit mode hooks
    const [editMode, setEditMode] = useState(false);
    const [editModeTask, setEditModeTask] = useState(false);

    // Hooks for data from useEffect functions
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [customerManagersList, setCustomerManagersList] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState("");

    // const [selectedCustomerManagerObject, setSelectedCustomerManagerObject] =
    //     useState({});

    // Hooks to show modal components
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Hooks for variables from the order
    const [selectedTask, setSelectedTask] = useState({});
    const [selectedPoint, setSelectedPoint] = useState({});
    const [selectedTruck, setSelectedTruck] = useState("");
    const [selectedDriver, setSelectedDriver] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedCustomerManagerName, setSelectedCustomerManagerName] =
        useState("");

    // Hooks for price details
    const [price, setPrice] = useState("");
    const [marketPrice, setMarketPrice] = useState("");
    const [paymentDays, setPaymentDays] = useState("");
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [selectedPaymentType, setSelectedPaymentType] = useState("");

    // Hooks for cargo details
    const [cargoName, setCargoName] = useState("");
    const [cargoWeight, setCargoWeight] = useState("");
    const [cargoLoadingType, setCargoLoadingType] = useState("");
    const [trailerType, setTrailerType] = useState("");

    // Hooks for document upload
    const [documents, setDocuments] = useState([]);
    const [selectedFileType, setSelectedFileType] = useState("");
    const [showUploadDocumentsModal, setShowUploadDocumentsModal] =
        useState(false);

    const [selectedCustomerManagerObject, setSelectedCustomerManagerObject] =
        useState(
            customers
                .find((customer) => customer.name === selectedCustomer)
                ?.managers.find(
                    (manager) => manager.full_name === order.customer_manager
                )
        );

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
        libraries: libraries,
    });

    const handleAddTaskButtonClick = (e) => {
        e.stopPropagation();
        setSelectedTask(null);
        setShowAddTaskModal(true);
    };

    const handleUploadDocumentsButtonClick = async (e) => {
        e.stopPropagation();
        try {
            const { data } = await axios.get(
                `/api/documents/${order.id}/order/`
            );
            setDocuments(data.documents);
            console.log("Documents", data.documents);
        } catch (error) {
            console.log("Error", error);
        }
        setShowUploadDocumentsModal(true);
    };

    useEffect(() => {
        getCsrfToken();
    }, []);

    useEffect(() => {
        const targetCustomer = customers.find(
            (customer) => customer.name === selectedCustomer
        );
        setCustomerManagersList(targetCustomer ? targetCustomer.managers : []);
    }, [customers, selectedCustomer]);

    useEffect(() => {
        const managerObject = customerManagersList.find(
            (manager) => manager.full_name === selectedCustomerManagerName
        );

        setSelectedCustomerManagerObject(managerObject || {});
    }, [customerManagersList, selectedCustomerManagerName]);

    useEffect(() => {
        const managerObject = customers
            .find((customer) => customer.name === selectedCustomer)
            ?.managers.find(
                (manager) => manager.full_name === order.customer_manager
            );

        setSelectedCustomerManagerObject(managerObject || {});
    }, [customers, selectedCustomer, order]);

    useEffect(() => {
        setSelectedTruck(order.truck);
        setSelectedDriver(order.driver);
        setPrice(order.price);
        setMarketPrice(order.market_price);
        setPaymentDays(order.payment_period);
        setSelectedPaymentType(order.payment_type);
        setDistance(order.distance);
        setSelectedCustomer(order.customer);
        setOrderNumber(order.order_number);
        setCargoName(order.cargo_name);
        setCargoWeight(order.cargo_weight);
        setCargoLoadingType(order.loading_type);
        setTrailerType(order.trailer_type);
        setSelectedCustomerManagerName(order.customer_manager);
        setTasks(order.tasks);
        setUser(order.user);
        setSelectedPlatform(order.platform);
    }, [order]);

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

    //FIXME: This useEffect for distance is not working as expected
    // useEffect(() => {
    //     (async () => {
    //         let dataToUpdate = {};

    //         if (typeof distance === "string" && distance) {
    //             dataToUpdate = {
    //                 distance: parseInt(distance.replace(" km", "")),
    //             };
    //         }
    //         try {
    //             // Only proceed if order.distance is either 0 or empty
    //             if (!order.distance || order.distance === 0) {
    //                 const response = await axios.put(
    //                     `/api/orders/edit/${order.id}/`,
    //                     dataToUpdate
    //                 );
    //                 console.log("Order edited successfully:", response.data);
    //             }
    //         } catch (error) {
    //             console.error("Error editing order:", error.message);
    //         }
    //     })();
    // }, [tasks, distance, order.distance]);

    const handleDoubleClick = (field) => {
        dispatch({
            type: "TOGGLE_EDIT_MODE",
            field: `editMode${capitalizeFirstLetter(field)}`,
        });
    };

    const handleFieldFormSubmit = async (e, field) => {
        e.preventDefault();
        e.stopPropagation();

        let dataToUpdate = {};
        switch (field) {
            case "truck":
                dataToUpdate = { truck: selectedTruck };
                break;
            case "price":
                dataToUpdate = {
                    price: price,
                    payment_period: paymentDays,
                    payment_type: selectedPaymentType,
                };
                break;
            case "marketPrice":
                dataToUpdate = { market_price: marketPrice };
                break;
            case "driver":
                dataToUpdate = { driver: selectedDriver };
                break;
            case "customer":
                dataToUpdate = {
                    customer: selectedCustomer,
                    platform: selectedPlatform,
                };
                break;
            case "customerManager":
                dataToUpdate = {
                    customer_manager: selectedCustomerManagerName,
                };
                break;
            case "cargo":
                dataToUpdate = {
                    cargo_name: cargoName,
                    cargo_weight: cargoWeight,
                    loading_type: cargoLoadingType,
                    trailer_type: trailerType,
                };
                break;
            case "orderNumber":
                dataToUpdate = { order_number: orderNumber };
                break;
            case "orderDistance":
                dataToUpdate = { distance: distance };
                break;
            default:
                break;
        }

        try {
            const response = await axios.put(
                `/api/orders/edit/${order.id}/`,
                dataToUpdate
            );
            console.log("Order edited successfully:", response.data);
            dispatch({
                type: "TOGGLE_EDIT_MODE",
                field: `editMode${capitalizeFirstLetter(field)}`,
            });
        } catch (error) {
            console.error("Error editing order:", error.message);
        }
    };

    const handleFormSubmitGlobal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Global Form Submit!!!");
        setEditModeOrder(false);
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/trucks/");
            setTrucks(data);
        })();

        (async () => {
            const { data } = await axios.get("/api/drivers/");
            setDrivers(data);
        })();

        (async () => {
            const { data } = await axios.get("/api/customers/");
            setCustomers(data);
        })();

        (async () => {
            const { data } = await axios.get("/api/payment-types/");
            setPaymentTypes(data);
        })();

        (async () => {
            const { data } = await axios.get("/api/platforms/");
            setPlatforms(data);
        })();
    }, []);

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

        const isConfirmed = window.confirm(
            "Ви впевнені, що хочете видалити задачу?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axios.delete(`/api/tasks/delete/${taskId}/`);
            console.log("Task deleted successfully:", response.data);

            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error.message);
        }
    };

    const handleDocumentUpload = (documentsData) => {
        setDocuments((prevDocuments) => [...prevDocuments, documentsData]);
    };

    return (
        <>
            <AddTaskModalComponent
                order={order}
                selectedTask={selectedTask}
                selectedTruck={selectedTruck}
                selectedDriver={selectedDriver}
                selectedPoint={selectedPoint}
                setSelectedPoint={setSelectedPoint}
                showAddTaskModal={showAddTaskModal}
                setShowAddTaskModal={setShowAddTaskModal}
                editModeTask={editModeTask}
                setEditModeTask={setEditModeTask}
                tasks={tasks}
                setTasks={setTasks}
            />

            <UploadDocumentsModalComponent
                showUploadDocumentsModal={showUploadDocumentsModal}
                setShowUploadDocumentsModal={setShowUploadDocumentsModal}
                order={order}
                selectedFileType={selectedFileType}
                setSelectedFileType={setSelectedFileType}
                onDocumentUpload={handleDocumentUpload}
                documents={documents}
            />

            <form onSubmit={handleFormSubmitGlobal}>
                <div className="order-container">
                    <div className="order-details">
                        <HeaderComponent
                            dispatch={dispatch}
                            order={order}
                            tasks={tasks}
                            orderNumber={orderNumber}
                            setOrderNumber={setOrderNumber}
                            editModeOrderNumber={
                                editModeState.editModeOrderNumber
                            }
                            editModeOrder={editModeOrder}
                            setEditModeOrder={setEditModeOrder}
                            handleDoubleClick={handleDoubleClick}
                            handleFormSubmit={handleFieldFormSubmit}
                        />
                        <ActionsComponent
                            handleAddTaskButtonClick={handleAddTaskButtonClick}
                            handleUploadDocumentsButtonClick={
                                handleUploadDocumentsButtonClick
                            }
                        />
                        <div className="order-details__content">
                            <div className="order-details__content-block">
                                <div className="order-details__content-row">
                                    <CarrierComponent />
                                    <CarrierManagerComponent user={user} />
                                </div>
                                <div className="order-details__content-row">
                                    <TruckComponent
                                        dispatch={dispatch}
                                        trucks={trucks}
                                        handleDoubleClick={handleDoubleClick}
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        editModeTruck={
                                            editModeState.editModeTruck
                                        }
                                        selectedTruck={selectedTruck}
                                        setSelectedTruck={setSelectedTruck}
                                        handleFormSubmit={handleFieldFormSubmit}
                                    />
                                    <DriverComponent
                                        dispatch={dispatch}
                                        handleDoubleClick={handleDoubleClick}
                                        drivers={drivers}
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        editModeDriver={
                                            editModeState.editModeDriver
                                        }
                                        selectedDriver={selectedDriver}
                                        setSelectedDriver={setSelectedDriver}
                                        handleFormSubmit={handleFieldFormSubmit}
                                    />
                                </div>
                                <div className="order-details__content-row">
                                    <div className="order-details__content-row-block order-details__content-row-block_tasks">
                                        <RouteComponent
                                            distance={distance}
                                            duration={duration}
                                        />
                                        {/* <DragAndDropTaskOrderComponent
                                            tasks={tasks}
                                            setTasks={setTasks}
                                            handleShowPointOnMap={
                                                handleShowPointOnMap
                                            }
                                            handleEditModeTask={
                                                handleEditModeTask
                                            }
                                            handleDeleteTask={handleDeleteTask}
                                        /> */}

                                        <TaskComponent
                                            tasks={tasks}
                                            setTasks={setTasks}
                                            handleShowPointOnMap={
                                                handleShowPointOnMap
                                            }
                                            handleEditModeTask={
                                                handleEditModeTask
                                            }
                                            handleDeleteTask={handleDeleteTask}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="order-details__content-block">
                                <div className="order-details__content-row">
                                    <PriceComponent
                                        dispatch={dispatch}
                                        distance={distance}
                                        order={order}
                                        price={price}
                                        setPrice={setPrice}
                                        paymentDays={paymentDays}
                                        setPaymentDays={setPaymentDays}
                                        paymentTypes={paymentTypes}
                                        setSelectedPaymentType={
                                            setSelectedPaymentType
                                        }
                                        selectedPaymentType={
                                            selectedPaymentType
                                        }
                                        marketPrice={marketPrice}
                                        setMarketPrice={setMarketPrice}
                                        editModePrice={
                                            editModeState.editModePrice
                                        }
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        handleFormSubmit={handleFieldFormSubmit}
                                        handleDoubleClick={handleDoubleClick}
                                    />
                                    <MarketPriceComponent
                                        selectedCustomer={selectedCustomer}
                                        dispatch={dispatch}
                                        order={order}
                                        marketPrice={marketPrice}
                                        distance={distance}
                                        setMarketPrice={setMarketPrice}
                                        editModeMarketPrice={
                                            editModeState.editModeMarketPrice
                                        }
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        handleFormSubmit={handleFieldFormSubmit}
                                        handleDoubleClick={handleDoubleClick}
                                    />
                                    <CustomerComponent
                                        order={order}
                                        dispatch={dispatch}
                                        customers={customers}
                                        platforms={platforms}
                                        selectedPlatform={selectedPlatform}
                                        setSelectedPlatform={
                                            setSelectedPlatform
                                        }
                                        selectedCustomer={selectedCustomer}
                                        setSelectedCustomer={
                                            setSelectedCustomer
                                        }
                                        editModeCustomer={
                                            editModeState.editModeCustomer
                                        }
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        handleFormSubmit={handleFieldFormSubmit}
                                        handleDoubleClick={handleDoubleClick}
                                    />
                                </div>
                                <div className="order-details__content-row">
                                    <CargoComponent
                                        dispatch={dispatch}
                                        cargoName={cargoName}
                                        cargoWeight={cargoWeight}
                                        cargoLoadingType={cargoLoadingType}
                                        trailerType={trailerType}
                                        setCargoName={setCargoName}
                                        setCargoWeight={setCargoWeight}
                                        setCargoLoadingType={
                                            setCargoLoadingType
                                        }
                                        setTrailerType={setTrailerType}
                                        editModeCargo={
                                            editModeState.editModeCargo
                                        }
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        handleFormSubmit={handleFieldFormSubmit}
                                        handleDoubleClick={handleDoubleClick}
                                    />

                                    <CustomerManagerComponent
                                        dispatch={dispatch}
                                        selectedCustomer={selectedCustomer}
                                        customerManagersList={
                                            customerManagersList
                                        }
                                        selectedCustomerManagerObject={
                                            selectedCustomerManagerObject
                                        }
                                        order={order}
                                        selectedCustomerManagerName={
                                            selectedCustomerManagerName
                                        }
                                        setSelectedCustomerManagerName={
                                            setSelectedCustomerManagerName
                                        }
                                        editModeCustomerManager={
                                            editModeState.editModeCustomerManager
                                        }
                                        editModeOrder={editModeOrder}
                                        setEditModeOrder={setEditModeOrder}
                                        handleFormSubmit={handleFieldFormSubmit}
                                        handleDoubleClick={handleDoubleClick}
                                    />
                                </div>
                                <div className="order-details__content-row">
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
                                </div>
                            </div>
                        </div>
                        <FooterComponent setEditModeOrder={setEditModeOrder} />
                    </div>
                </div>
            </form>
        </>
    );
};

export default OrderPage;
