import axios from "axios";

export const TRUCK_LIST_REQUEST = "TRUCK_LIST_REQUEST";
export const TRUCK_LIST_SUCCESS = "TRUCK_LIST_SUCCESS";
export const TRUCK_LIST_FAIL = "TRUCK_LIST_FAIL";

export const listTrucks = () => async (dispatch) => {
    try {
        dispatch({ type: TRUCK_LIST_REQUEST });

        const { data } = await axios.get("/api/trucks/");

        dispatch({ type: TRUCK_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: TRUCK_LIST_FAIL, payload: error.message });
    }
};
