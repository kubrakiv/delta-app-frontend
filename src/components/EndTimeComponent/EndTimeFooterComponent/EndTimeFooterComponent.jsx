import React from "react";
import "./EndTimeFooterComponent.scss";

const EndTimeFooterComponent = ({ setShowEndTimeModal }) => {
    return (
        <>
            <div className="end-time__footer">
                <button
                    title="Save Date and Time"
                    className="end-time__footer-btn end-time__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    title="Close Window"
                    className="end-time__footer-btn end-time__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowEndTimeModal(false);
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default EndTimeFooterComponent;
