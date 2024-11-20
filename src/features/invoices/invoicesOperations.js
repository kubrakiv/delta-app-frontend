import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listInvoices = createAsyncThunk(
  "invoice/listInvoices",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("/api/invoices/");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const listInvoiceDetails = createAsyncThunk(
  "invoice/listInvoiceDetails",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/invoices/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (invoice, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/invoices/create/", invoice);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (invoice, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/invoices/update/${invoice.id}/`,
        invoice
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/invoices/delete/${id}/`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
