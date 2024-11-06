import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import CustomMarker from "../CustomMarkerComponent/CustomMarkerComponent";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { mapDefaultCenter } from "../../reducers/mapReducers";
import { setMapCurrentLocation } from "../../actions/mapActions";
import { AdvancedMarker } from "./AdvancedMarker";
import { DELIVERY_CONSTANTS } from "../../constants/global";

const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

// import { defaultTheme } from "./Theme";
// import { CurrentLocationMarker } from "../CurrentLocationMarker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  streetViewControl: false,
  // mapTypeControl: false,
  disableDoubleClickZoom: true,
  rotateControl: false,
  keyboardShortcuts: false,
  //   styles: defaultTheme,
};

const Map = ({ tasks, directionsResponse }) => {
  const dispatch = useDispatch();
  const mapRef = useRef(undefined);
  const currentLocation = useSelector((state) => state.map.currentLocation);
  const defaultCenter = useSelector((state) => state.map.defaultCenter);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (currentLocation) {
      setCenter(currentLocation);
    }
    if (!currentLocation && defaultCenter) {
      setCenter(defaultCenter);
    }
  }, [currentLocation, defaultCenter]);

  const loadingIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Green icon for loading
  const unloadingIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Red icon for unloading

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
    >
      {tasks ? (
        tasks.map((task) => {
          const position = {
            lat: parseFloat(task.point_details.gps_latitude),
            lng: parseFloat(task.point_details.gps_longitude),
          };

          const icon =
            task.type === LOADING
              ? loadingIcon
              : task.type === UNLOADING
              ? unloadingIcon
              : loadingIcon;

          const title =
            (task && task.point_details.company_name + ": " + task.title) ||
            (tasks &&
              task.point_details.company_name +
                ": " +
                task.point_details.country_short +
                "-" +
                task.point_details.postal_code +
                " " +
                task.point_details.city);

          return (
            // <AdvancedMarker
            //   key={task.id}
            //   position={position}
            //   icon={icon}
            //   title={title}
            // >
            //   <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     width="24"
            //     height="24"
            //     viewBox="0 0 24 24"
            //     fill="none"
            //     stroke="#000000"
            //     strokeWidth="2"
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //   >
            //     <path d="M12 5v13M5 12l7 7 7-7" />
            //   </svg>
            // </AdvancedMarker>
            <Marker
              key={task.id}
              position={position}
              icon={icon}
              title={title}
            />
          );
        })
      ) : (
        <Marker position={center} />
        // <AdvancedMarker position={center}>
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="24"
        //     height="24"
        //     viewBox="0 0 24 24"
        //     fill="none"
        //     stroke="#000000"
        //     strokeWidth="2"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //   >
        //     <path d="M12 5v13M5 12l7 7 7-7" />
        //   </svg>
        // </AdvancedMarker>
      )}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{ suppressMarkers: true }}
        />
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);
