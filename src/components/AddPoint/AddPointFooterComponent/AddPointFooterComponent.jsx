import React from "react";
import { useDispatch } from "react-redux";
import "./AddPointFooterComponent.scss";
import { setMapCurrentLocationDelete } from "../../../actions/mapActions";

const AddPointFooterComponent = ({
  setShowAddPointModal,
  setSelectedPoint,
  onAddTask,
}) => {
  const dispatch = useDispatch();

  const handleClearCurrentLocation = () => {
    dispatch(setMapCurrentLocationDelete());
  };

  return (
    <>
      <div className="add-point-details__footer">
        <button
          className="add-point-details__footer-btn add-point-details__footer-btn_save"
          type="submit"
        >
          Записати
        </button>
        <button
          className="add-point-details__footer-btn add-point-details__footer-btn_close"
          onClick={(e) => {
            e.preventDefault();
            setShowAddPointModal(false);
            // TODO move to Redux store logic for showAddPointModal
            setSelectedPoint({});
            handleClearCurrentLocation();
          }}
        >
          <div>Закрити</div>
        </button>
      </div>
    </>
  );
};

export default AddPointFooterComponent;
