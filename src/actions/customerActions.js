import axios from "axios";
import { setCustomerListData } from "../reducers/customerReducers";

export const SET_CUSTOMER_LIST_DATA = "SET_CUSTOMER_LIST_DATA";
export const SET_CUSTOMER_DETAILS_DATA = "SET_CUSTOMER_DETAILS_DATA";
export const SET_EDIT_MODE_CUSTOMER = "SET_EDIT_MODE_CUSTOMER";

export const listCustomers = () => async (dispatch) => {
    try {
        dispatch(setCustomerListData({ loading: true, error: null }));

        const { data } = await axios.get("/api/customers/");
        dispatch(setCustomerListData({ data, loading: false }));
    } catch (error) {
        dispatch(setCustomerListData({ error: error.message, loading: false }));
    }
};
