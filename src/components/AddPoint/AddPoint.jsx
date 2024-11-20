import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import { getLatLng, getZipCode } from "use-places-autocomplete";
import {
  getCountry,
  getStreet,
  getStreetNumber,
  getCity,
} from "./address_functions";
import { getCsrfToken } from "../../utils/getCsrfToken";
import { setMapCurrentLocation } from "../../actions/mapActions";

import Map from "../Map";
import AddPointFooterComponent from "./AddPointFooterComponent/AddPointFooterComponent";
import AddPointCustomerComponent from "./AddPointCustomerComponent/AddPointCustomerComponent";
import AddPointAutocomplete from "./AddPointAutocomplete/AddPointAutocomplete";

import "./AddPoint.scss";

const { REACT_APP_API_KEY: API_KEY } = import.meta.env;

const AddPoint = ({
  setShowAddPointModal,
  onPointCreate,
  editMode,
  selectedPoint,
  setSelectedPoint,
  onPointUpdate,
  onAddTask,
  onToggleMode,
}) => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const defaultCenter = useSelector((state) => state.map.defaultCenter);
  const currentLocation = useSelector((state) => state.map.currentLocation);

  const [center, setCenter] = useState(defaultCenter);

  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);

  const [googleAddress, setGoogleAddress] = useState("");

  const [company, setCompany] = useState(
    editMode ? selectedPoint.company_name : ""
  );
  const [country, setCountry] = useState(editMode ? selectedPoint.country : "");
  const [selectedCustomer, setSelectedCustomer] = useState(
    editMode ? selectedPoint.customer : null
  );
  const [postalCode, setPostalCode] = useState(
    editMode ? selectedPoint.postal_code : ""
  );
  const [city, setCity] = useState(editMode ? selectedPoint.city : "");
  const [street, setStreet] = useState(editMode ? selectedPoint.street : "");
  const [streetNumber, setStreetNumber] = useState(
    editMode ? selectedPoint.street_number : ""
  );
  const [gpsLatitude, setGpsLatitude] = useState(
    editMode ? selectedPoint.gps_latitude : ""
  );
  const [gpsLongitude, setGpsLongitude] = useState(
    editMode ? selectedPoint.gps_longitude : ""
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: map.libraries,
  });

  useEffect(() => {
    getCsrfToken();
  }, []);

  const onPlaceSelect = useCallback((results) => {
    const { lat, lng } = getLatLng(results[0]);
    const zipCode = getZipCode(results[0], false);
    const coordinates = { lat, lng };

    // setCenter(coordinates);
    dispatch(setMapCurrentLocation(coordinates));
    setGoogleAddress(results[0].formatted_address);
    setCountry(getCountry(results[0]));
    setPostalCode(zipCode);
    setCity(getCity(results[0]));
    setStreet(getStreet(results[0]));
    setStreetNumber(getStreetNumber(results[0]));
    setGpsLatitude(lat);
    setGpsLongitude(lng);

    console.log(results[0], "Google Address Object");
    console.log("📍 Coordinates: ", coordinates);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/customers/");
      setCustomers(data);
    })();

    (async () => {
      const { data } = await axios.get("/api/point-companies/");
      setCompanies(data);
    })();

    (async () => {
      const { data } = await axios.get("/api/countries/");
      setCountries(data);
    })();
  }, []);

  const handleFormSubmit = async (e, editMode, selectedPoint) => {
    e.preventDefault();

    const data = {
      country: country,
      postal_code: postalCode,
      city: city,
      street: street,
      street_number: streetNumber,
      gps_latitude: gpsLatitude,
      gps_longitude: gpsLongitude,
      company_name: company,
      customer: selectedCustomer,
    };
    console.log(data, "this is a json object POINT FORM DATA");
    console.log(selectedPoint, "this is a selected POINT");

    if (editMode) {
      try {
        const response = await axios.put(
          `/api/points/edit/${selectedPoint.id}/`,
          data
        );

        onPointUpdate(selectedPoint.id, response.data);
        setShowAddPointModal(false);
        setSelectedPoint({});

        console.log(response.data, "this is a point UPDATED POINT");
      } catch (error) {
        console.error("Error creating task:", error.message);
      }
    }

    if (!editMode) {
      try {
        const response = await axios.post("/api/points/create/", data);

        onPointCreate(response.data);
        setSelectedPoint(response.data);
        onToggleMode();

        if (!onAddTask) {
          setShowAddPointModal(false);
        }

        console.log(response.data, "this is a point CREATED POINT");
      } catch (error) {
        console.error("Error creating task:", error.message);
      }
    }
  };

  return (
    <>
      <form
        className="add-point-details__form"
        onSubmit={(e) => handleFormSubmit(e, editMode, selectedPoint)}
      >
        <div className="point-container">
          <div className="point-details">
            {!editMode && (
              <div className="add-point-details__content-row add-point-details__content-row__search">
                <AddPointAutocomplete
                  isLoaded={isLoaded}
                  onSelect={onPlaceSelect}
                />
              </div>
            )}

            {googleAddress && (
              <div className="add-point-details__content-row add-point-details__content-row__formatted-address">
                <div className="point-details__content-row-block">
                  {googleAddress}
                </div>
              </div>
            )}

            <div className="add-point-details__content">
              <div className="add-point-details__content-block">
                <div className="add-point-details__content-row">
                  <AddPointCustomerComponent
                    customers={customers}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                  />
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Компанія
                    </div>
                    <input
                      id="country"
                      name="country"
                      className="add-point-details__input"
                      value={company || ""}
                      onChange={(e) => setCompany(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Країна
                    </div>
                    <input
                      id="country"
                      name="country"
                      className="add-point-details__input"
                      value={country || ""}
                      onChange={(e) => setCountry(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Індекс
                    </div>
                    <input
                      id="country"
                      name="country"
                      className="add-point-details__input"
                      value={postalCode || ""}
                      onChange={(e) => setPostalCode(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Місто
                    </div>
                    <input
                      id="city"
                      name="city"
                      className="add-point-details__input"
                      value={city || ""}
                      onChange={(e) => setCity(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Вулиця
                    </div>
                    <input
                      id="country"
                      name="country"
                      className="add-point-details__input"
                      value={street || ""}
                      onChange={(e) => setStreet(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Номер будинку
                    </div>
                    <input
                      id="country"
                      name="country"
                      className="add-point-details__input"
                      value={streetNumber || ""}
                      onChange={(e) => setStreetNumber(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Довжина
                    </div>
                    <input
                      id="city"
                      name="city"
                      className="add-point-details__input"
                      value={gpsLatitude || ""}
                      onChange={(e) => setGpsLatitude(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block">
                    <div className="add-point-details__content-row-block-title">
                      Ширина
                    </div>
                    <input
                      id="city"
                      name="city"
                      className="add-point-details__input"
                      value={gpsLongitude || ""}
                      onChange={(e) => setGpsLongitude(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                </div>
              </div>
              <div className="add-point-details__content-block">
                <div className="add-point-details__content-row">
                  <div className="add-point-details__content-row-block add-point-details__content-row-block-map">
                    {isLoaded ? (
                      <Map center={currentLocation || defaultCenter} />
                    ) : (
                      <h2>Loading...</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <AddPointFooterComponent
              setShowAddPointModal={setShowAddPointModal}
              setSelectedPoint={setSelectedPoint}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPoint;
