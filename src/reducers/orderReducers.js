import {
    SET_EDIT_MODE_ORDER,
    SET_ORDER_LIST_DATA,
    SET_ORDER_DETAILS_DATA,
} from "../actions/orderActions";

const initialState = {
    orders: {
        data: [],
        loading: false,
        error: null,
    },
    order: {
        data: {},
        loading: false,
        error: null,
    },
    editMode: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_LIST_DATA:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    ...action.data,
                    loading: action.data.loading,
                    error: action.data.error,
                },
            };

        case SET_ORDER_DETAILS_DATA:
            return {
                ...state,
                order: {
                    ...state.order,
                    ...action.data,
                    loading: action.data.loading,
                    error: action.data.error,
                },
            };

        case SET_EDIT_MODE_ORDER:
            return { ...state, editMode: action.payload };

        default:
            return state;
    }
};

export const setOrderListData = (data) => ({
    type: SET_ORDER_LIST_DATA,
    data,
});

export const setOrderDetailsData = (data) => ({
    type: SET_ORDER_DETAILS_DATA,
    data,
});

export const setEditModeOrder = (editModeOrder) => ({
    type: SET_EDIT_MODE_ORDER,
    payload: editModeOrder,
});
