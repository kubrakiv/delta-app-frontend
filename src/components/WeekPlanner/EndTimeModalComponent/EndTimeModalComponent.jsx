import React, { useEffect, useRef } from "react";
import "./EndTimeModalComponent.scss";
import EndTimeComponent from "../../EndTimeComponent/EndTimeComponent";

const EndTimeModalComponent = ({
    showEndTimeModal,
    setShowEndTimeModal,
    selectedTask,
    onTaskUpdate,
}) => {
    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowEndTimeModal(false);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowEndTimeModal(false);
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
                style={{ display: showEndTimeModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`end-time-modal${
                        showEndTimeModal ? "" : " hidden"
                    }`}
                    style={{ display: showEndTimeModal ? "block" : "none" }}
                >
                    <EndTimeComponent
                        setShowEndTimeModal={setShowEndTimeModal}
                        selectedTask={selectedTask}
                        onTaskUpdate={onTaskUpdate}
                    />
                </div>
            </div>
        </>
    );
};

export default EndTimeModalComponent;
