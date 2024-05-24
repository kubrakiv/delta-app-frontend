import React from "react";
import "./OrderPage.scss";
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

const OrderPage = () => {
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
