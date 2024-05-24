import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderNumberComponent from "../OrderNumberComponent/OrderNumberComponent";
import "./HeaderComponent.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
    const navigate = useNavigate();

    const order = useSelector((state) => state.ordersInfo.order.data);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(order.tasks);
    }, [order]);

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
                <div className="order-details__header-block">
                    Заявка {order.order_number}
                </div>
                {/* <OrderNumberComponent /> */}
            </div>
        </>
    );
};

export default HeaderComponent;
