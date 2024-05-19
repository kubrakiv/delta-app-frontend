import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { orderReducer } from "./reducers/orderReducers";

import { truckListReducer } from "./reducers/truckReducers";
import { driverListReducer } from "./reducers/driverReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import { mapDefaultCenter } from "./reducers/mapReducers";

const reducer = combineReducers({
    ordersInfo: orderReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    map: mapDefaultCenter,

    truckList: truckListReducer,

    driverList: driverListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
});

export default store;
