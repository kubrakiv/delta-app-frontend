export const SET_MAP_CURRENT_LOCATION = "SET_MAP_CURRENT_LOCATION";
export const SET_MAP_CURRENT_LOCATION_DELETE =
  "SET_MAP_CURRENT_LOCATION_DELETE";

export const setMapCurrentLocation = (location) => ({
  type: SET_MAP_CURRENT_LOCATION,
  location,
});

export const setMapCurrentLocationDelete = () => ({
  type: SET_MAP_CURRENT_LOCATION_DELETE,
});
