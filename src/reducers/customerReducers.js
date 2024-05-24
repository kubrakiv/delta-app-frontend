import {
    SET_CUSTOMER_LIST_DATA,
    SET_CUSTOMER_DETAILS_DATA,
    SET_EDIT_MODE_CUSTOMER,
} from "../actions/customerActions";

const initialState = {
    customers: {
        data: [],
        loading: false,
        error: null,
    },
    customer: {
        data: {},
        loading: false,
        error: null,
    },
    editMode: false,
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CUSTOMER_LIST_DATA:
            return {
                ...state,
                customers: {
                    ...state.customers,
                    ...action.data,
                    loading: action.data.loading,
                    error: action.data.error,
                },
            };

        case SET_CUSTOMER_DETAILS_DATA:
            return {
                ...state,
                customer: {
                    ...state.customer,
                    ...action.data,
                    loading: action.data.loading,
                    error: action.data.error,
                },
            };

        case SET_EDIT_MODE_CUSTOMER:
            return { ...state, editMode: action.payload };

        default:
            return state;
    }
};

export const setCustomerListData = (data) => ({
    type: SET_CUSTOMER_LIST_DATA,
    data,
});

export const setCustomerDetailsData = (data) => ({
    type: SET_CUSTOMER_DETAILS_DATA,
    data,
});

export const setEditModeCustomer = (payload) => ({
    type: SET_EDIT_MODE_CUSTOMER,
    payload,
});
