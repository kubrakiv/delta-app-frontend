import { createSlice } from "@reduxjs/toolkit";
import {
  listInvoices,
  listInvoiceDetails,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "./invoicesOperations";

import { compareInvoiceWithOrder } from "../../features/invoices/invoiceUtils";

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: {
      data: [],
    },
    invoiceDetails: {
      data: {},
    },
    isInvoiceUpdateNeeded: true, // Add the flag here
  },
  reducers: {
    setInvoiceUpdateNeeded: (state, action) => {
      state.isInvoiceUpdateNeeded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listInvoices.fulfilled, (state, action) => {
      state.invoices.data = action.payload;
    });
    builder.addCase(listInvoiceDetails.fulfilled, (state, action) => {
      state.invoiceDetails.data = action.payload;
      // state.invoiceDetails.isInvoiceUpdateNeeded = compareInvoiceWithOrder(
      //   state.invoiceDetails.data
      // );
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.invoices.data.push(action.payload);
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      const index = state.invoices.data.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      state.invoices.data[index] = action.payload;
    });
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      state.invoices.data = state.invoices.data.filter(
        (invoice) => invoice.id !== action.payload.id
      );
    });
  },
});

export const invoicesActions = invoicesSlice.actions;
export const { setInvoiceUpdateNeeded } = invoicesSlice.actions;
export default invoicesSlice.reducer;
