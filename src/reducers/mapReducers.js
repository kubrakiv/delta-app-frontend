const initialState = {
  defaultCenter: { lat: 50.0786592, lng: 14.5223136 },
  libraries: ["places", "geometry"],
  currentLocation: null,
  truckLocation: null,
  truck: {},
};

export const mapDefaultCenter = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MAP_CURRENT_LOCATION":
      return { ...state, currentLocation: action.location };

    case "SET_MAP_CURRENT_LOCATION_DELETE":
      return { ...state, currentLocation: null };

    case "SET_TRUCK_CURRENT_LOCATION":
      return { ...state, truckLocation: action.location };

    case "SET_TRUCK_DETAILS":
      return { ...state, truck: action.truck };

    default:
      return state;
  }
};
