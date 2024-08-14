import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listTrucks = createAsyncThunk(
  "truck/listTrucks",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("/api/trucks/");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
