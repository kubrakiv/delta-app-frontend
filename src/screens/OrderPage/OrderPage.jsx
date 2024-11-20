import { useEffect } from "react";
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

import { compareInvoiceWithOrder } from "../../features/invoices/invoiceUtils";
import { findTrailer } from "../../components/OrdersTableComponent/OrdersTableComponent";
import { setInvoiceUpdateNeeded } from "../../features/invoices/invoicesSlice";
import { listTrucks } from "../../features/trucks/trucksOperations";
import { listInvoiceDetails } from "../../features/invoices/invoicesOperations";

import "./OrderPage.scss";

const OrderPage = () => {
  const dispatch = useDispatch();

  const invoiceData = useSelector(
    (state) => state.invoicesInfo.invoiceDetails.data
  );
  const trucks = useSelector((state) => state.trucksInfo.trucks.data);

  const order = useSelector((state) => state.ordersInfo.order.data);
  console.log("Order", order);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(listOrderDetails(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(listTrucks());
    dispatch(listInvoiceDetails(order?.invoice?.id));
  }, [dispatch, order?.invoice?.id]);

  useEffect(() => {
    console.log("Use Effect");
    if (order && invoiceData) {
      const trailer = order?.truck ? findTrailer(order?.truck, trucks) : "";
      const orderData = {
        ...order,
        trailer: trailer,
      };
      console.log("Order Data", orderData);
      console.log("Invoice Data", invoiceData);
      const isUpdateNeeded = compareInvoiceWithOrder(orderData, invoiceData);
      console.log("isUpdateNeeded", isUpdateNeeded);
      dispatch(setInvoiceUpdateNeeded(isUpdateNeeded));
    }
  }, [order, invoiceData]); // Include `order.invoice` to track changes

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
