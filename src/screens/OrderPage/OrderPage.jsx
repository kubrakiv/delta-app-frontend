import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listOrderDetails } from "../../actions/orderActions";

import TruckComponent from "./TruckComponent/TruckComponent";
import DriverComponent from "./DriverComponent/DriverComponent";
import PriceComponent from "./PriceComponent/PriceComponent";
import CustomerComponent from "./CustomerComponent/CustomerComponent";
import CargoComponent from "./CargoComponent/CargoComponent";
import CustomerManagerComponent from "./CustomerManagerComponent/CustomerManagerComponent";
import TaskComponent from "./TaskComponent/TaskComponent";
import RouteComponent from "./RouteComponent/RouteComponent";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import ActionsComponent from "./ActionsComponent/ActionsComponent";
import CarrierComponent from "./CarrierComponent/CarrierComponent";
import CarrierManagerComponent from "./CarrierManagerComponent/CarrierManagerComponent";
import FooterComponent from "./FooterComponent/FooterComponent";
import AddTaskModalComponent from "../../components/AddTask/AddTaskModalComponent/AddTaskModalComponent";
import MarketPriceComponent from "./MarketPriceComponent/MarketPriceComponent";
import OrderMapComponent from "./OrderMapComponent";
import UploadDocumentsComponent from "../../components/UploadDocumentsComponent/UploadDocumentsComponent";
import TruckLocationComponent from "./TruckLocationComponent";

import { compareInvoiceWithOrder } from "../../features/invoices/invoiceUtils";
import { findTrailer } from "../../utils/getTrailer";
import { setInvoiceUpdateNeeded } from "../../features/invoices/invoicesSlice";
import { listTrucks } from "../../features/trucks/trucksOperations";
import { listInvoiceDetails } from "../../features/invoices/invoicesOperations";
import { getTruckLocation } from "../../services/truckLocationService";

import "./OrderPage.scss";

import { DELIVERY_CONSTANTS } from "../../constants/global";
import { setTruckDetails } from "../../actions/mapActions";
const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

const OrderPage = () => {
  const dispatch = useDispatch();

  const [truckLocationLoaded, setTruckLocationLoaded] = useState(false); // Track if truck location is loaded

  const invoiceData = useSelector(
    (state) => state.invoicesInfo.invoiceDetails.data
  );
  const trucks = useSelector((state) => state.trucksInfo.trucks.data);

  const order = useSelector((state) => state.ordersInfo.order.data);
  console.log("Order", order);

  const tasks = useSelector((state) => state.ordersInfo.order.data.tasks);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(listOrderDetails(id));
    }
  }, [id]);

  // Fetch trucks and invoice details on component mount
  useEffect(() => {
    dispatch(listTrucks());
    if (order && order.invoice && order.invoice.id) {
      dispatch(listInvoiceDetails(order.invoice.id));
    }
  }, [dispatch, order]);

  // Compare invoice with order data to determine if update is needed
  useEffect(() => {
    if (order && invoiceData) {
      const trailer = order?.truck ? findTrailer(order?.truck, trucks) : "";
      const orderData = {
        ...order,
        trailer: trailer,
      };
      const isUpdateNeeded = compareInvoiceWithOrder(orderData, invoiceData);
      console.log("isUpdateNeeded", isUpdateNeeded);
      dispatch(setInvoiceUpdateNeeded(isUpdateNeeded));
    }
  }, [order, invoiceData]); // Include `order.invoice` to track changes

  // Determine if the order is finished
  const isOrderFinished = tasks?.every(
    (task) =>
      (task.type === LOADING || task.type === UNLOADING) &&
      task.end_date &&
      task.end_time
  );

  // Fetch truck location if truck is assigned to the order
  useEffect(() => {
    if (isOrderFinished) {
      console.log("Order is finished, not fetching truck location.");
      return;
    }

    if (order?.truck) {
      const truck = trucks.find((t) => t.plates === order.truck);
      dispatch(setTruckDetails(truck));
      if (truck) {
        if (truck.gps_id) {
          // Only attempt to fetch truck location if gps_id is present
          getTruckLocation(truck, dispatch)
            .then(() => {
              setTruckLocationLoaded(true);
            })
            .catch((error) => {
              console.error("Failed to fetch truck location:", error);
              setTruckLocationLoaded(false); // Set false if location fetch fails
            });
        } else {
          // No gps_id, set truck location as not loaded
          setTruckLocationLoaded(false);
          console.log("Truck found, but no gps_id available");
        }
      } else {
        // Truck not found in the list
        setTruckLocationLoaded(false);
        console.log("Truck not found in the list");
      }
    } else {
      // No truck assigned to the order
      setTruckLocationLoaded(false);
      console.log("No truck assigned to the order");
    }
  }, [order, trucks, dispatch, isOrderFinished]);

  return (
    <>
      <AddTaskModalComponent />
      <UploadDocumentsComponent />
      <div className="order-container">
        <div className="order-details">
          <HeaderComponent />
          <ActionsComponent />
          <div className="order-details__content">
            <div className="order-details__content-block">
              <div className="order-details__content-row">
                <CarrierComponent />
                <CarrierManagerComponent />
              </div>
              <div className="order-details__content-row">
                <TruckComponent />
                <DriverComponent />
              </div>
              <div className="order-details__content-row">
                <div className="order-details__content-row-block order-details__content-row-block_tasks">
                  <RouteComponent />
                  <TaskComponent />
                </div>
              </div>
            </div>
            <div className="order-details__content-block">
              <div className="order-details__content-row">
                <PriceComponent />
                <MarketPriceComponent />
                <CustomerComponent />
              </div>
              <div className="order-details__content-row">
                <CargoComponent />
                <CustomerManagerComponent />
              </div>
              <TruckLocationComponent />
              <OrderMapComponent />
            </div>
          </div>
          <FooterComponent />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
