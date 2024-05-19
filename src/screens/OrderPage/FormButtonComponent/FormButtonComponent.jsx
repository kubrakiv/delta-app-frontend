import React, { useEffect } from "react";
import "./FormButtonComponent.scss";
import { useDispatch } from "react-redux";
import { setEditModeOrder } from "../../../actions/orderActions";

function FormButtonComponent({ onSave, onClose }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                dispatch(setEditModeOrder(false));
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleEditModeClose = () => {
        onClose(false);
        dispatch(setEditModeOrder(false));
    };

    const handleSave = () => {
        onSave();
        handleEditModeClose();
    };

    return (
        <>
            <div className="form-footer form-footer_number">
                <button
                    type="button"
                    className="form-footer-btn form-footer-btn_save"
                    onClick={handleSave}
                >
                    Зберегти
                </button>
                <button
                    type="button"
                    className="form-footer-btn form-footer-btn_close"
                    onClick={handleEditModeClose}
                >
                    Закрити
                </button>
            </div>
        </>
    );
}

export default FormButtonComponent;
