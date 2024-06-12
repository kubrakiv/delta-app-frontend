import React from "react";
import "./AddServiceTaskFooterComponent.scss";

const AddServiceTaskFooterComponent = ({
    showServiceTaskModal,
    setShowServiceTaskModal,
    handleSelectDriver,
}) => {
    return (
        <>
            <div className="add-task-details__footer">
                <button
                    title="Save Order"
                    className="add-task-details__footer-btn add-task-details__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    title="Close Order"
                    className="add-task-details__footer-btn add-task-details__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowServiceTaskModal(false);
                        handleSelectDriver(null);
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default AddServiceTaskFooterComponent;
