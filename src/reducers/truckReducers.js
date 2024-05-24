import { SET_TRUCK_LIST_DATA } from "../actions/truckActions";

const initialState = {
    trucks: {
        data: [],
    },
};

export const truckReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRUCK_LIST_DATA:
            return {
                ...state,
                trucks: {
                    ...state.trucks,
                    data: action.data,
                },
            };

        default:
            return state;
    }
};

export const setTruckListData = (data) => ({
    type: SET_TRUCK_LIST_DATA,
    data,
});
