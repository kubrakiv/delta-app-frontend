import React from "react";
import "./PricePerKmComponent.scss";
import { getPricePerKm } from "../../../utils/pricePerKm";

const PricePerKmComponent = ({ type, price, distance }) => {
    let pricePerKm = 0;

    switch (type) {
        case "price":
        case "table":
            pricePerKm = getPricePerKm(parseInt(price), distance);
            break;
        case "market-price":
            pricePerKm = getPricePerKm(parseInt(price), distance);
            break;
        default:
            break;
    }

    const getBackgroundColor = () => {
        if (pricePerKm < 1) {
            return "#FF0000"; // red
        } else if (pricePerKm >= 1 && pricePerKm < 1.1999) {
            return "blue"; // orange
        } else if (pricePerKm >= 1.2 && pricePerKm < 1.2999) {
            return "rgb(234, 230, 15)"; // yellow
        } else if (pricePerKm >= 1.3) {
            return "green"; // green
        }
    };

    const getTextColor = () => {
        if (pricePerKm < 1) {
            return "white"; // red
        } else if (pricePerKm >= 1 && pricePerKm < 1.1999) {
            return "white"; // orange
        } else if (pricePerKm >= 1.2 && pricePerKm < 1.2999) {
            return "black"; // yellow
        } else if (pricePerKm >= 1.3) {
            return "white"; // green
        }
    };

    return (
        <>
            <div
                className="order-details__priceperkm"
                style={{
                    backgroundColor: getBackgroundColor(),
                    color: getTextColor(),
                }}
            >
                <span className="order-details__priceperkm_text">
                    {pricePerKm}
                    {type === "price" || type === "market-price"
                        ? " Eur/km"
                        : type === "table"
                        ? ""
                        : null}
                </span>
            </div>
        </>
    );
};

export default PricePerKmComponent;
