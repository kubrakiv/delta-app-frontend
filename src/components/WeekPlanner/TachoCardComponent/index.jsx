import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { BsFillPersonVcardFill } from "react-icons/bs";

import { selectTrucks } from "../../../features/trucks/trucksSelectors";
import { fetchDriverCurrentTimeAnalysis } from "../../../services/driverTimeAnalysisService";

import drivers from "../../../services/drivers.json";
import DriverCardComponent from "./DriverCardComponent";

import "./style.scss";

const TachoCardComponent = ({ style = "tacho-card", truckId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [driverAnalysis, setDriverAnalysis] = useState(null);
  const [driverData, setDriverData] = useState(null);

  const trucks = useSelector(selectTrucks);

  const handleShowTachoData = () => {
    togglePopup();
    const truck = trucks.find((truck) => truck.id === truckId);

    const fetchDriverData = async () => {
      try {
        const driver = drivers.find(
          (driver) =>
            driver.last_name.toLowerCase() ===
            truck.driver_details.last_name.toLowerCase()
        );
        setDriverData(driver);
        console.log("Driver ID:", driver.id);

        // Fetch driver analysis data
        const driverTachoData = await fetchDriverCurrentTimeAnalysis(driver.id);
        console.log(
          `Driver ${driver.last_name} Analysis Data:`,
          driverTachoData
        );

        setDriverAnalysis(driverTachoData);
      } catch (error) {
        console.error("Error fetching driver data or analysis:", error);
      }
    };

    fetchDriverData();
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <button
        title="Показати дані тахографа"
        type="button"
        className={cn("plus-btn", {
          "plus-btn__tacho-card": style,
        })}
        onClick={handleShowTachoData}
      >
        <BsFillPersonVcardFill />
      </button>
      {isPopupOpen && (
        <div className="popup-card">
          <div className="popup-content">
            <h2>{`${driverData.first_name} ${driverData.last_name}`}</h2>
            <DriverCardComponent data={driverAnalysis} />
            <button onClick={togglePopup} className="close-popup-btn">
              Close
            </button>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <div className="popup-backdrop" onClick={togglePopup}></div>
      )}
    </>
  );
};

export default TachoCardComponent;
