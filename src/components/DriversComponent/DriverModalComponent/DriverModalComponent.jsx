import React, { useEffect, useRef } from "react";
import "./DriverModalComponent.scss";
import AddDriverComponent from "../AddDriverComponent/AddDriverComponent";

const DriverModalComponent = ({
    showDriverModal,
    setShowDriverModal,
    selectedDriver,
    setSelectedDriver,
    editDriverProfileMode,
    setEditDriverProfileMode,
    handleEditProfileMode,
    handleRemoveSelectedDriver,
    handleDriverUpdate,
}) => {
    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowDriverModal(false);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowDriverModal(false);
                setEditDriverProfileMode(false);
                setSelectedDriver({});
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
                style={{ display: showDriverModal ? "block" : "none" }}
            >
                <div
                    ref={modalRef}
                    className={`driver-modal${
                        showDriverModal ? "" : " hidden"
                    }`}
                    style={{
                        display: showDriverModal ? "block" : "none",
                    }}
                >
                    <AddDriverComponent
                        setShowDriverModal={setShowDriverModal}
                        showDriverModal={showDriverModal}
                        selectedDriver={selectedDriver}
                        editDriverProfileMode={editDriverProfileMode}
                        setSelectedDriver={setSelectedDriver}
                        setEditDriverProfileMode={setEditDriverProfileMode}
                        handleEditProfileMode={handleEditProfileMode}
                        handleRemoveSelectedDriver={handleRemoveSelectedDriver}
                        handleDriverUpdate={handleDriverUpdate}
                    />
                </div>
            </div>
        </>
    );
};

export default DriverModalComponent;
