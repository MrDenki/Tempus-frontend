import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksService from "../../api/tasksService";

const initialState = {
  error: "",
  isLoading: false,
  reports: [],
};

export const getReports = createAsyncThunk(
  "tasks/getReports",
  async ({ startTime, endTime, workerId }, { rejectWithValue }) => {
    try {
      console.log(startTime, endTime, workerId);
      const { data } = await tasksService.getReport(
        startTime,
        endTime,
        workerId
      );
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const tasksSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [getReports.pending]: (state) => {
      state.isLoading = true;
    },
    [getReports.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.reports = payload;
    },
    [getReports.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
