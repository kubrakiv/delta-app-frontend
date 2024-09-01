import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
