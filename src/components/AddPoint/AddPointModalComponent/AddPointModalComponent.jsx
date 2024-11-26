import { useDispatch, useSelector } from "react-redux";
import { setMapCurrentLocationDelete } from "../../../actions/mapActions";
import {
  setEditModePoint,
  setSelectedPoint,
} from "../../../features/points/pointsSlice";
import { selectSelectedPoint } from "../../../features/points/pointsSelectors";

import AddPoint from "../AddPoint";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";

import "./AddPointModalComponent.scss";

const AddPointModalComponent = ({
  showAddPointModal,
  setShowAddPointModal,
}) => {
  const dispatch = useDispatch();

  const selectedPoint = useSelector(selectSelectedPoint);

  const handleCloseModal = () => {
    setShowAddPointModal(false);
    dispatch(setEditModePoint(false));
    dispatch(setSelectedPoint({}));
    dispatch(setMapCurrentLocationDelete());
  };

  return (
    <GenericModalComponent
      show={showAddPointModal}
      onClose={handleCloseModal}
      content={
        <AddPoint
          initialPointData={selectedPoint}
          setShowAddPointModal={setShowAddPointModal}
        />
      }
    ></GenericModalComponent>
  );
};

export default AddPointModalComponent;
