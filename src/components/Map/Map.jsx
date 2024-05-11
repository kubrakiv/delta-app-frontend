import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import CustomMarker from "../CustomMarkerComponent/CustomMarkerComponent";
import { FaMapMarkerAlt } from "react-icons/fa";

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
    // styles: defaultTheme,
};

const Map = ({ tasks, center, directionsResponse }) => {
    const mapRef = useRef(undefined);

    const loadingIcon =
        "http://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Green icon for loading
    const unloadingIcon =
        "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Red icon for unloading

    // const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [map, setMap] = useState(null);

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
                        lat: parseFloat(
                            task.point_details.gps_latitude ||
                                task.point.gps_latitude
                        ),
                        lng: parseFloat(
                            task.point_details.gps_longitude ||
                                task.point.gps_longitude
                        ),
                    };

                    const icon =
                        task.type === "Завантаження"
                            ? loadingIcon
                            : task.type === "Розвантаження"
                            ? unloadingIcon
                            : loadingIcon;

                    const title =
                        (task &&
                            task.point_details.company_name +
                                ": " +
                                task.title) ||
                        (tasks &&
                            task.point_details.company_name +
                                ": " +
                                task.point_details.country_short +
                                "-" +
                                task.point_details.postal_code +
                                " " +
                                task.point_details.city);

                    return (
                        // <CustomMarker
                        //     key={task.id}
                        //     position={position}
                        //     type={task.type}
                        //     title={title}
                        // />
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
            )}
            {/* <CurrentLocationMarker position={center} /> */}
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
