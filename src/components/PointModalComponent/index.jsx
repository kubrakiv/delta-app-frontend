import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PointPage from "../../screens/PointPage/PointPage";
import "./style.scss";
import GenericModalComponent from "../../globalComponents/GenericModalComponent";
import { setMapCurrentLocationDelete } from "../../actions/mapActions";

const PointModalComponent = ({
  showPointModal,
  setShowPointModal,
  selectedPoint,
  setSelectedPoint,
  footer = true,
}) => {
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setShowPointModal(false);
    setSelectedPoint({});
    dispatch(setMapCurrentLocationDelete());
  };
  return (
    <GenericModalComponent
      show={showPointModal}
      onClose={handleModalClose}
      content={
        <PointPage
          selectedPoint={selectedPoint}
          setShowPointModal={setShowPointModal}
        />
      }
      footer={footer}
    />
  );
};

export default PointModalComponent;
