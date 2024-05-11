import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = ({ setEditModeOrder }) => {
    return (
        <>
            <div className="order-details__footer">
                <button
                    title="Edit Order"
                    className="order-details__footer-btn order-details__footer-btn_edit"
                    onClick={(e) => {
                        e.preventDefault();
                        setEditModeOrder(true);
                    }}
                >
                    Редагувати
                </button>
                <button
                    title="Save Order"
                    className="order-details__footer-btn order-details__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    title="Close Order"
                    className="order-details__footer-btn order-details__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Link to="/orders-list">
                        <div>Закрити</div>
                    </Link>
                </button>
            </div>
        </>
    );
};

export default FooterComponent;
