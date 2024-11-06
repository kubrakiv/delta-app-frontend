const initialState = {
  defaultCenter: { lat: 50.0786592, lng: 14.5223136 },
  libraries: ["places", "geometry"],
  currentLocation: null,
};

export const mapDefaultCenter = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MAP_CURRENT_LOCATION":
      return { ...state, currentLocation: action.location };

    case "SET_MAP_CURRENT_LOCATION_DELETE":
      return { ...state, currentLocation: null };

    default:
      return state;
  }
};
