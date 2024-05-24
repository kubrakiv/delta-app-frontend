import React from "react";
import "./RouteComponent.scss";
import { useSelector } from "react-redux";

const RouteComponent = () => {
    const order = useSelector((state) => state.ordersInfo.order.data);

    return (
        <div>
            <div className="order-details__content-row-block-route">
                <div className="order-details__content-row-block-route-title">
                    Маршрут
                </div>
                <div className="order-details__content-row-block-route-distance">
                    Відстань: {order.distance}
                </div>
                <div className="order-details__content-row-block-route-duration">
                    Час в дорозі: {order.duration}
                </div>
            </div>
        </div>
    );
};

export default RouteComponent;
