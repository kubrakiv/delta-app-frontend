import { SET_PLANNER } from "../actions/plannerActions";

const initialState = {
    showOrderNumber: false,
    showDriver: false,
    showCustomer: false,
};

export default function plannerReducers(state = initialState, action) {
    switch (action.type) {
        case SET_PLANNER:
            return {
                ...state,
                ...action.data,
            };

        default:
            return state;
    }
}
