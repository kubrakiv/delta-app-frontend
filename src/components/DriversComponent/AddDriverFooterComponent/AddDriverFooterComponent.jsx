import React from "react";
import "./AddDriverFooterComponent.scss";

const AddDriverFooterComponent = ({
    setShowDriverModal,
    setSelectedDriver,
    setEditDriverProfileMode,
    handleRemoveSelectedDriver,
}) => {
    return (
        <>
            <div className="driver-details__footer">
                <button
                    title="Edit Order"
                    className="driver-details__footer-btn driver-details__footer-btn_edit"
                    onClick={(e) => {
                        e.preventDefault();
                        setEditDriverProfileMode(true);
                    }}
                >
                    Редагувати
                </button>
                <button
                    title="Записати"
                    className="driver-details__footer-btn driver-details__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    title="Закрити"
                    className="driver-details__footer-btn driver-details__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowDriverModal(false);
                        setEditDriverProfileMode(false);
                        handleRemoveSelectedDriver();
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default AddDriverFooterComponent;
