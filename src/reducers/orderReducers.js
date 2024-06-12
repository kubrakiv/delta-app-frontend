import {
    SET_EDIT_MODE_ORDER,
    SET_ORDER_LIST_DATA,
    SET_ORDER_DETAILS_DATA,
    SET_EDIT_MODE_TASK,
    SET_ADD_TASK_MODE,
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
    addTaskMode: false,
    task: {
        data: {},
        editMode: false,
    },
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

        case SET_ADD_TASK_MODE:
            return { ...state, addTaskMode: action.payload };

        case SET_EDIT_MODE_TASK:
            return {
                ...state,
                task: {
                    ...state.task,
                    data: action.data,
                    editMode: action.payload,
                },
            };

        default:
            return state;
    }
};
