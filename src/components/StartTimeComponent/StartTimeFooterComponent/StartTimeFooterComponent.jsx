import React from "react";
import "./StartTimeFooterComponent.scss";

const StartTimeFooterComponent = ({ setShowStartTimeModal }) => {
    return (
        <>
            <div className="start-time__footer">
                <button
                    title="Save Date and Time"
                    className="start-time__footer-btn start-time__footer-btn_save"
                    type="submit"
                >
                    Записати
                </button>
                <button
                    title="Close Window"
                    className="start-time__footer-btn start-time__footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowStartTimeModal(false);
                    }}
                >
                    Закрити
                </button>
            </div>
        </>
    );
};

export default StartTimeFooterComponent;
