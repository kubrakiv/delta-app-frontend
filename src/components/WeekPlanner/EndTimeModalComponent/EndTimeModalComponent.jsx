import React, { useEffect, useRef } from "react";
import "./EndTimeModalComponent.scss";
import EndTimeComponent from "../../EndTimeComponent/EndTimeComponent";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";

const EndTimeModalComponent = ({
    showEndTimeModal,
    setShowEndTimeModal,
    selectedTask,
    onTaskUpdate,
}) => {
    const handleCloseModal = () => {
        setShowEndTimeModal(false);
    };

    return (
        <>
            <GenericModalComponent
                show={showEndTimeModal}
                onClose={handleCloseModal}
                content={
                    <EndTimeComponent
                        setShowEndTimeModal={setShowEndTimeModal}
                        selectedTask={selectedTask}
                        onTaskUpdate={onTaskUpdate}
                    />
                }
                footer
            />
        </>
    );
};

export default EndTimeModalComponent;
