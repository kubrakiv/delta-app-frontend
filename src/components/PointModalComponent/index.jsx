import { useDispatch, useSelector } from "react-redux";
import { setMapCurrentLocationDelete } from "../../actions/mapActions";
import { selectSelectedPoint } from "../../features/points/pointsSelectors";
import { setSelectedPoint } from "../../features/points/pointsSlice";

import PointPage from "../../screens/PointPage/PointPage";
import GenericModalComponent from "../../globalComponents/GenericModalComponent";

import "./style.scss";

const PointModalComponent = ({
  showPointModal,
  setShowPointModal,
  footer = true,
}) => {
  const dispatch = useDispatch();

  const selectedPoint = useSelector(selectSelectedPoint);

  const handleModalClose = () => {
    setShowPointModal(false);
    dispatch(setSelectedPoint({}));
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
