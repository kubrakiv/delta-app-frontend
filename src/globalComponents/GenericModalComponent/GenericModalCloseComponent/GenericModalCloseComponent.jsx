import React from "react";

const ModalCloseComponent = ({ setShowPointModal }) => {
    return (
        <>
            <div
                className="modal__close"
                onClick={() => setShowPointModal(false)}
            >
                &times;
            </div>
        </>
    );
};

export default ModalCloseComponent;
