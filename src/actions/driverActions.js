import axios from "axios";
import { setDriverListData } from "../reducers/driverReducers";

export const SET_DRIVER_LIST_DATA = "SET_DRIVER_LIST_DATA";

export const listDrivers = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/drivers/");
        dispatch(setDriverListData(data));
    } catch (error) {
        console.error(error);
    }
};
