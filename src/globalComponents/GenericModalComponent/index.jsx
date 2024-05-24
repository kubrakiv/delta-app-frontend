import React, { useRef, useEffect } from "react";
import "./style.scss";

const GenericModalComponent = ({ show, onClose, content }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        // const handleClickOutside = (event) => {
        //     if (modalRef.current && !modalRef.current.contains(event.target)) {
        //         // onClose();
        //     }
        // };

        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener("keydown", handleKeyDown);
            // document.addEventListener("click", handleClickOutside);
        }

        return () => {
            // document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, onClose]);

    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: show ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`generic-modal${show ? "" : " hidden"}`}
                    style={{ display: show ? "block" : "none" }}
                >
                    {content}
                </div>
            </div>
        </>
    );
};

export default GenericModalComponent;
