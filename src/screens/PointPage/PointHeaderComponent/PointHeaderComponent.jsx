import React from "react";
import ModalCloseComponent from "../../../components/Modal/ModalCloseComponent/ModalCloseComponent";
import "./PointHeaderComponent.scss";

const PointHeaderComponent = ({ address, setShowPointModal }) => {
    return (
        <>
            <div className="point-details__header">
                <div className="point-details__header-block">{address}</div>
                <ModalCloseComponent setShowPointModal={setShowPointModal} />
            </div>
        </>
    );
};

export default PointHeaderComponent;
