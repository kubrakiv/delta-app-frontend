import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditModeOrder } from "../../../actions/orderActions";

const FooterComponent = ({ onClose }) => {
    const dispatch = useDispatch();
    const editModeOrder = useSelector((state) => state.ordersInfo.editMode);

    const toggleEditMode = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setEditModeOrder(!editModeOrder));
    };

    return (
        <>
            <div className="order-details__footer">
                <button
                    title="Edit Order"
                    className="order-details__footer-btn order-details__footer-btn_edit"
                    onClick={toggleEditMode}
                >
                    {!editModeOrder ? "Редагувати" : "Завершити редагування"}
                </button>
                <button
                    title="Save Order"
                    className="order-details__footer-btn order-details__footer-btn_save"
                >
                    Записати
                </button>
                <button
                    title="Close Order"
                    className="order-details__footer-btn order-details__footer-btn_close"
                    onClick={onClose}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default FooterComponent;
