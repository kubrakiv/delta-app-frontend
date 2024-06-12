import React, { useEffect, useRef } from "react";
import "./StartTimeModalComponent.scss";
import StartTimeComponent from "../../StartTimeComponent/StartTimeComponent";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";

const StartTimeModalComponent = ({
    showStartTimeModal,
    setShowStartTimeModal,
    selectedTask,
    onTaskUpdate,
}) => {
    const handleCloseModal = () => {
        setShowStartTimeModal(false);
    };

    return (
        <>
            <GenericModalComponent
                show={showStartTimeModal}
                onClose={handleCloseModal}
                content={
                    <StartTimeComponent
                        setShowStartTimeModal={setShowStartTimeModal}
                        selectedTask={selectedTask}
                        onTaskUpdate={onTaskUpdate}
                    />
                }
                footer
            />
        </>
    );
};

export default StartTimeModalComponent;
