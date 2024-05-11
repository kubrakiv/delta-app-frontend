import React, { useEffect, useRef } from "react";
import "./StartTimeModalComponent.scss";
import StartTimeComponent from "../../StartTimeComponent/StartTimeComponent";

const StartTimeModalComponent = ({
    showStartTimeModal,
    setShowStartTimeModal,
    selectedTask,
    onTaskUpdate,
}) => {
    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowStartTimeModal(false);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowStartTimeModal(false);
            }
        };

        // document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            // document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    });
    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: showStartTimeModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`end-time-modal${
                        showStartTimeModal ? "" : " hidden"
                    }`}
                    style={{ display: showStartTimeModal ? "block" : "none" }}
                >
                    <StartTimeComponent
                        setShowStartTimeModal={setShowStartTimeModal}
                        selectedTask={selectedTask}
                        onTaskUpdate={onTaskUpdate}
                    />
                </div>
            </div>
        </>
    );
};

export default StartTimeModalComponent;
