import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderNumberComponent from "../OrderNumberComponent/OrderNumberComponent";
import "./HeaderComponent.scss";
import { FaArrowLeft } from "react-icons/fa";

const HeaderComponent = ({
    order,
    tasks,
    orderNumber,
    setOrderNumber,
    editModeOrderNumber,
    editModeOrder,
    setEditModeOrder,
    handleDoubleClick,
    handleFormSubmit,
    dispatch,
}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="order-details__header">
                <div
                    className="order-details__return-button"
                    onClick={handleGoBack}
                >
                    <FaArrowLeft />
                </div>
                <div className="order-details__header-block">
                    Маршрут № {order.number}
                </div>
                {tasks.length > 0 && (
                    <div className="order-details__header-block">
                        {tasks
                            .map(
                                (task) =>
                                    `${task.point_details.country_short}-${task.point_details.postal_code} ${task.point_details.city}`
                            )
                            .join(" - ")}
                    </div>
                )}
                <div
                    className="order-details__header-block order-details__header-block_order-number"
                    onDoubleClick={() => handleDoubleClick("orderNumber")}
                >
                    <OrderNumberComponent
                        dispatch={dispatch}
                        orderNumber={orderNumber}
                        setOrderNumber={setOrderNumber}
                        editModeOrderNumber={editModeOrderNumber}
                        editModeOrder={editModeOrder}
                        setEditModeOrder={setEditModeOrder}
                        handleFormSubmit={handleFormSubmit}
                    />
                </div>
            </div>
        </>
    );
};

export default HeaderComponent;
