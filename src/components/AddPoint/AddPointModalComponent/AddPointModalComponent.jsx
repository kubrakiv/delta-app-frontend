import React, { useRef, useEffect } from "react";
import AddPoint from "../AddPoint";
import "./AddPointModalComponent.scss";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";
import { setMapCurrentLocationDelete } from "../../../actions/mapActions";
import { useDispatch } from "react-redux";

const AddPointModalComponent = ({
  showAddPointModal,
  setShowAddPointModal,
  onPointCreate,
  editMode,
  selectedPoint,
  setSelectedPoint,
  onPointUpdate,
}) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setShowAddPointModal(false);
    setSelectedPoint({});
    dispatch(setMapCurrentLocationDelete());
  };

  return (
    <GenericModalComponent
      show={showAddPointModal}
      onClose={handleCloseModal}
      content={
        <AddPoint
          setShowAddPointModal={setShowAddPointModal}
          onPointCreate={onPointCreate}
          editMode={editMode}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          onPointUpdate={onPointUpdate}
        />
      }
    ></GenericModalComponent>
  );
};

export default AddPointModalComponent;
