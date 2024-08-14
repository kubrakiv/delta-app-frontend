import { createSlice } from "@reduxjs/toolkit";
import { listTrucks } from "./trucksOperations";

export const truckSlice = createSlice({
  name: "truck",
  initialState: {
    trucks: {
      data: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listTrucks.fulfilled, (state, action) => {
      state.trucks.data = action.payload;
    });
  },
});

export const truckActions = truckSlice.actions;
export default truckSlice.reducer;
