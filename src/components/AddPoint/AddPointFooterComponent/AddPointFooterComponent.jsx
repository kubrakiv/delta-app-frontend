import React from "react";
import "./AddPointFooterComponent.scss";

const AddPointFooterComponent = ({
    setShowAddPointModal,
    setSelectedPoint,
    onAddTask,
}) => {
    return (
        <>
            <div className="add-point-details__footer">
                <button
                    className="add-point-details__footer-btn add-point-details__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    className="add-point-details__footer-btn add-point-details__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAddPointModal(false);
                        setSelectedPoint({});
                    }}
                >
                    <div>Закрити</div>
                </button>
            </div>
        </>
    );
};

export default AddPointFooterComponent;
