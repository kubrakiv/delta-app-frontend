import React from "react";
import { FaPlus } from "react-icons/fa";
import cn from "classnames";
import "./AddTaskButton.scss";

function AddTaskButton({
    onTruckDateSelect,
    dayNumber,
    truckId,
    title,
    style,
    onMouseEnter,
    onMouseLeave,
}) {
    return (
        <>
            <button
                title="Додати завдання"
                type="button"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={cn("plus-btn", {
                    "plus-btn__week": style,
                })}
                onClick={(e) =>
                    onTruckDateSelect({
                        dayNumber,
                        truckId,
                    })
                }
            >
                <FaPlus /> {title}
            </button>
        </>
    );
}

export default AddTaskButton;
