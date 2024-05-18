import React, { useEffect } from "react";
import "./FormButtonComponent.scss";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { useDispatch } from "react-redux";

function FormButtonComponent({ setEditModeOrder, handleFormSubmit, onField }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                dispatch({
                    type: "TOGGLE_EDIT_MODE",
                    field: `editMode${capitalizeFirstLetter(onField)}`,
                });
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <>
            <div className="form-footer form-footer_number">
                <button
                    type="button"
                    className="form-footer-btn form-footer-btn_save"
                    onClick={(e) => handleFormSubmit(e, onField)}
                >
                    Save
                </button>
                <button
                    className="form-footer-btn form-footer-btn_close"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch({
                            type: "TOGGLE_EDIT_MODE",
                            field: `editMode${capitalizeFirstLetter(onField)}`,
                        });
                        setEditModeOrder(false);
                    }}
                >
                    Exit
                </button>
            </div>
        </>
    );
}

export default FormButtonComponent;
