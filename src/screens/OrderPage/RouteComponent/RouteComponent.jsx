import React from "react";
import "./RouteComponent.scss";

const RouteComponent = ({ distance, duration, calculateRoute }) => {
    return (
        <div>
            <div
                className="order-details__content-row-block-route"
                // onClick={calculateRoute}
            >
                <div className="order-details__content-row-block-route-title">
                    Маршрут
                </div>
                <div className="order-details__content-row-block-route-distance">
                    Відстань: {distance}
                </div>
                <div className="order-details__content-row-block-route-duration">
                    Час в дорозі: {duration}
                </div>
            </div>
        </div>
    );
};

export default RouteComponent;
