import axios from "axios";

export const DRIVER_LIST_REQUEST = "DRIVER_LIST_REQUEST";
export const DRIVER_LIST_SUCCESS = "DRIVER_LIST_SUCCESS";
export const DRIVER_LIST_FAIL = "DRIVER_LIST_FAIL";

export const listDrivers = () => async (dispatch) => {
    try {
        dispatch({ type: DRIVER_LIST_REQUEST });

        const { data } = await axios.get("/api/driver-profiles/");

        dispatch({ type: DRIVER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DRIVER_LIST_FAIL, payload: error.message });
    }
};
