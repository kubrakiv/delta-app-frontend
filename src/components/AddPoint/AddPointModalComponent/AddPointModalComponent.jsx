import React, { useRef, useEffect } from "react";
import AddPoint from "../AddPoint";
import "./AddPointModalComponent.scss";

const AddPointModalComponent = ({
    showAddPointModal,
    setShowAddPointModal,
    onPointCreate,
    editMode,
    selectedPoint,
    setSelectedPoint,
    onPointUpdate,
}) => {
    const modalRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //         setShowAddPointModal(false);
    //     }
    // };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowAddPointModal(false);
            }
        };

        // document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            //     document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: showAddPointModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`add-point-modal${
                        showAddPointModal ? "" : " hidden"
                    }`}
                    style={{ display: showAddPointModal ? "block" : "none" }}
                >
                    <AddPoint
                        setShowAddPointModal={setShowAddPointModal}
                        onPointCreate={onPointCreate}
                        editMode={editMode}
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                        onPointUpdate={onPointUpdate}
                    />
                </div>
            </div>
        </>
    );
};

export default AddPointModalComponent;
