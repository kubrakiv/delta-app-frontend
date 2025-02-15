import { useDispatch, useSelector } from "react-redux";
import { setShowTruckOnMapModal } from "../../../features/planner/plannerSlice";
import { selectShowTruckOnMapModal } from "../../../features/planner/plannerSelectors";
import GenericModalComponent from "../../../globalComponents/GenericModalComponent";
import OrderMapComponent from "../../../screens/OrderPage/OrderMapComponent";
import {
  setTruckCurrentLocation,
  setTruckDetails,
} from "../../../actions/mapActions";
import TruckLocationComponent from "../../../screens/OrderPage/TruckLocationComponent";

const TruckOnMapModalComponent = () => {
  const dispatch = useDispatch();
  const showTruckOnMapModal = useSelector(selectShowTruckOnMapModal);

  const handleCloseModal = () => {
    dispatch(setShowTruckOnMapModal(false));
    dispatch(setTruckDetails({}));
    dispatch(setTruckCurrentLocation({}));
  };

  return (
    <>
      <GenericModalComponent
        show={showTruckOnMapModal}
        onClose={handleCloseModal}
        content={
          <>
            <TruckLocationComponent style={"mb-5"} />
            <OrderMapComponent />
          </>
        }
      />
    </>
  );
};

export default TruckOnMapModalComponent;
