import axios from "axios";
import {
    setOrderDetailsData,
    setOrderListData,
} from "../reducers/orderReducers";

// export const ORDER_UPDATE_REQUEST = "ORDER_UPDATE_REQUEST";
// export const ORDER_UPDATE_SUCCESS = "ORDER_UPDATE_SUCCESS";
// export const ORDER_UPDATE_FAIL = "ORDER_UPDATE_FAIL";

export const SET_EDIT_MODE_ORDER = "SET_EDIT_MODE_ORDER";
export const SET_ORDER_LIST_DATA = "SET_ORDER_LIST_DATA";
export const SET_ORDER_DETAILS_DATA = "SET_ORDER_DETAILS_DATA";

export const listOrders = () => async (dispatch) => {
    try {
        dispatch(setOrderListData({ loading: true }));

        const { data } = await axios.get("/api/orders/");
        dispatch(setOrderListData({ data }));
    } catch (error) {
        dispatch(setOrderListData({ error: error.message }));
    } finally {
        dispatch(setOrderListData({ loading: false }));
    }
};

export const listOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(setOrderDetailsData({ loading: true }));

        const { data } = await axios.get(`/api/orders/${id}/`);

        dispatch(setOrderDetailsData({ data }));
    } catch (error) {
        dispatch(setOrderDetailsData({ error: error.message }));
    } finally {
        dispatch(setOrderDetailsData({ loading: false }));
    }
};

export const updateOrder =
    (dataToUpdate, orderId) => async (dispatch, getState) => {
        try {
            dispatch(setOrderDetailsData({ loading: true }));

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/orders/edit/${orderId}/`,
                dataToUpdate,
                config
            );

            console.log("DATA FROM UPDATE ORDER", data);

            dispatch(setOrderDetailsData({ data }));
        } catch (error) {
            dispatch(setOrderDetailsData({ error: error.message }));
        } finally {
            dispatch(setOrderDetailsData({ loading: false }));
        }
    };

export const setEditModeOrder = (editModeOrder) => ({
    type: SET_EDIT_MODE_ORDER,
    payload: editModeOrder,
});
