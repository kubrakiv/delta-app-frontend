import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import "./PointPage.scss";
import Map from "../../components/Map";
import PointHeaderComponent from "./PointHeaderComponent/PointHeaderComponent";
import PointCustomerComponent from "./PointCustomerComponent/PointCustomerComponent";
import PointCompanyComponent from "./PointCompanyComponent/PointCompanyComponent";
import PointGpsComponent from "./PointGpsComponent/PointGpsComponent";
import PointCountryComponent from "./PointCountryComponent/PointCountryComponent";
import PointAddressComponent from "./PointAddressComponent/PointAddressComponent";
import { setMapCurrentLocation } from "../../actions/mapActions";

const { REACT_APP_API_KEY: API_KEY } = import.meta.env;

const PointPage = ({ selectedPoint, setShowPointModal }) => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const currentLocation = useSelector((state) => state.map.currentLocation);

  useEffect(() => {
    const { gps_latitude, gps_longitude } = selectedPoint;
    dispatch(
      setMapCurrentLocation({
        lat: parseFloat(gps_latitude),
        lng: parseFloat(gps_longitude),
      })
    );
  }, [selectedPoint, dispatch]);

  const [point, setPoint] = useState({});
  const [customer, setCustomer] = useState(selectedPoint.customer);
  const [company, setCompany] = useState(selectedPoint.company_name);
  const [country, setCountry] = useState(selectedPoint.country);
  const [countryShort, setCountryShort] = useState(selectedPoint.country_short);
  const [postalCode, setPostalCode] = useState(selectedPoint.postal_code);
  const [city, setCity] = useState(selectedPoint.city);
  const [street, setStreet] = useState(
    selectedPoint.street + ", " + selectedPoint.street_number
  );
  const [gpsLatitude, setGpsLatitude] = useState(selectedPoint.gps_latitude);
  const [gpsLongitude, setGpsLongitude] = useState(selectedPoint.gps_longitude);
  const [fullAddress, setFullAddress] = useState(() => {
    const { postal_code, city, country_short, street, street_number } =
      selectedPoint;
    return `${country_short}-${postal_code} ${city}, ${street}, ${street_number}`;
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: map.libraries,
  });

  return (
    <>
      <div className="point-container">
        <div className="point-details">
          <PointHeaderComponent
            address={fullAddress}
            setShowPointModal={setShowPointModal}
          />
          <div className="point-details__content">
            <div className="point-details__content-block">
              <div className="point-details__content-row">
                <PointCustomerComponent customer={customer} />
              </div>
              <div className="point-details__content-row">
                <PointCompanyComponent company={company} />
              </div>
              <div className="point-details__content-row">
                <PointCountryComponent country={country} />
              </div>
              <div className="point-details__content-row">
                <PointAddressComponent full_address={fullAddress} />
              </div>
              <div className="point-details__content-row">
                <PointGpsComponent lat={gpsLatitude} lng={gpsLongitude} />
              </div>
            </div>
            <div className="point-details__content-block">
              <div className="point-details__content-row">
                <div className="point-details__content-row-block point-details__content-row-block-map">
                  {isLoaded ? (
                    <Map center={currentLocation} />
                  ) : (
                    <h2>Loading...</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointPage;
