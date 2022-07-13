import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksService from "../../api/tasksService";

const initialState = {
  error: "",
  isLoading: false,
  reports: [
    {
      date: "11.7.2022",
      data: [
        {
          title: "Task #1",
          description: null,
          workTime: 123123,
          timeLines: [
            {
              id: 30,
              taskId: 11,
              startTime: "2022-07-11T07:17:00.584Z",
              endTime: "2022-07-11T07:18:59.037Z",
              workTime: 123123,
            },
            {
              id: 31,
              taskId: 11,
              startTime: "2022-07-11T07:21:07.072Z",
              endTime: "2022-07-11T07:21:17.116Z",
              workTime: 123123,
            },
          ],
        },
      ],
    },
    {
      date: "12.7.2022",
      data: [
        {
          title: "Task #1",
          description: null,
          workTime: 123123,
          timeLines: [
            {
              id: 30,
              taskId: 11,
              startTime: "2022-07-11T07:17:00.584Z",
              endTime: "2022-07-11T07:18:59.037Z",
              workTime: 123123,
            },
            {
              id: 31,
              taskId: 11,
              startTime: "2022-07-11T07:21:07.072Z",
              endTime: "2022-07-11T07:21:17.116Z",
              workTime: 123123,
            },
          ],
        },
        {
          title: "Task #2",
          description: null,
          workTime: 123123,
          timeLines: [
            {
              id: 30,
              taskId: 11,
              startTime: "2022-07-11T07:17:00.584Z",
              endTime: "2022-07-11T07:18:59.037Z",
              workTime: 123123,
            },
            {
              id: 31,
              taskId: 11,
              startTime: "2022-07-11T07:21:07.072Z",
              endTime: "2022-07-11T07:21:17.116Z",
              workTime: 234324324,
            },
          ],
        },
      ],
    },
  ],
};

export const getReports = createAsyncThunk(
  "tasks/getReports",
  async ({ startTime, endTime, workerId }, { rejectWithValue }) => {
    try {
      console.log(startTime, endTime, workerId );
      const { data } = await tasksService.getReport(startTime, endTime, workerId);
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
