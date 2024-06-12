import React, { useRef, useEffect, useCallback } from "react";
import "./style.scss";
import GenericFooterComponent from "./GenericFooterComponent";

const GenericModalComponent = ({ show, onClose, content, footer }) => {
    const modalRef = useRef(null);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (show) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, handleKeyDown]);

    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: show ? "block" : "none" }}
            >
                <div className="modal-background" onClick={onClose} />
                <div
                    ref={modalRef}
                    className={`generic-modal${show ? "" : " hidden"}`}
                    style={{ display: show ? "block" : "none" }}
                >
                    {/* {header && <GenericHeaderComponent />} */}
                    {content}
                    {footer && <GenericFooterComponent onClose={onClose} />}
                </div>
            </div>
        </>
    );
};

export default GenericModalComponent;
