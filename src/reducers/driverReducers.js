import {
    DRIVER_LIST_FAIL,
    DRIVER_LIST_REQUEST,
    DRIVER_LIST_SUCCESS,
} from "../actions/driverActions";

export const driverListReducer = (state = { drivers: [] }, action) => {
    switch (action.type) {
        case DRIVER_LIST_REQUEST:
            return { loading: true, drivers: [] };
        case DRIVER_LIST_SUCCESS:
            return { loading: false, drivers: action.payload };
        case DRIVER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
