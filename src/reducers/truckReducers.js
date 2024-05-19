import {
    TRUCK_LIST_REQUEST,
    TRUCK_LIST_SUCCESS,
    TRUCK_LIST_FAIL,
} from "../actions/truckActions";

export const truckListReducer = (state = { trucks: [] }, action) => {
    switch (action.type) {
        case TRUCK_LIST_REQUEST:
            return { loading: true, trucks: [] };
        case TRUCK_LIST_SUCCESS:
            return { loading: false, trucks: action.payload };
        case TRUCK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
