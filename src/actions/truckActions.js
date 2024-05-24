import axios from "axios";
import { setTruckListData } from "../reducers/truckReducers";

export const SET_TRUCK_LIST_DATA = "SET_TRUCK_LIST_DATA";

export const listTrucks = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/trucks/");
        dispatch(setTruckListData(data));
    } catch (error) {
        console.error(error);
    }
};
