import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    orderDetailsReducer,
    orderListReducer,
} from "./reducers/orderReducers";
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
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    map: mapDefaultCenter,
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
