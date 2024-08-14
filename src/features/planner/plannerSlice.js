import { createSlice } from "@reduxjs/toolkit";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    showOrderNumber: false,
    showDriver: false,
    showCustomer: false,
  },
  reducers: {
    setPlanner: (state, action) => {
      state.showOrderNumber = action.payload.showOrderNumber;
      state.showDriver = action.payload.showDriver;
      state.showCustomer = action.payload.showCustomer;
    },
  },
});

export const { setPlanner } = plannerSlice.actions;
export default plannerSlice.reducer;
