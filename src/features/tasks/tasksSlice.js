import { createSlice } from "@reduxjs/toolkit";

import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "./tasksOperations";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: {
      data: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTasks.fulfilled, (state, action) => {
        state.tasks.data = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.data.findIndex(
          (task) => task.id === action.payload.id
        );
        state.tasks.data[index] = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.data.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks.data = state.tasks.data.filter(
          (task) => task.id !== action.payload
        );
      });
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
