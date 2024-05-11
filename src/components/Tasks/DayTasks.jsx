import React, { useState } from "react";
import Task from "../Task/Task";
import AddTaskButton from "../AddTaskButton/AddTaskButton";

function DayTasks({
    isHovered,
    showDriver,
    tasks,
    onSelect,
    onTruckDateSelect,
    dayNumber,
    truckId,
    setShowModal,
    handleEndTime,
    handleStartTime,
    handleServiceTaskModalShow,
    handleDeleteTask,
    handleEditModeTask,
}) {
    const hasTasks = tasks.length > 0;
    const week = true;

    return (
        <>
            {hasTasks &&
                tasks.map((task) => (
                    <Task
                        showDriver={showDriver}
                        task={task}
                        onSelect={onSelect}
                        setShowModal={setShowModal}
                        handleEndTime={handleEndTime}
                        handleStartTime={handleStartTime}
                        handleDeleteTask={handleDeleteTask}
                        handleEditModeTask={handleEditModeTask}
                    />
                ))}
            <AddTaskButton
                handleServiceTaskModalShow={handleServiceTaskModalShow}
                onSelect={onSelect}
                onTruckDateSelect={onTruckDateSelect}
                dayNumber={dayNumber}
                truckId={truckId}
                title={""}
                style={week}
            />
            {/* {isHovered && (
                
            )} */}
        </>
    );
}

export default DayTasks;
