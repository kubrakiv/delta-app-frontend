import { SET_DRIVER_LIST_DATA } from "../actions/driverActions";

const initialState = {
    drivers: {
        data: [],
    },
};

export const driverReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRIVER_LIST_DATA:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    data: action.data,
                },
            };

        default:
            return state;
    }
};

export const setDriverListData = (data) => ({
    type: SET_DRIVER_LIST_DATA,
    data,
});
