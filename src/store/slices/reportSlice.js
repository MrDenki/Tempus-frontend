import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksService from "../../api/tasksService";

const initialState = {
  reports: [
    {
      title: "fsgdh",
      description: "",
      creatorId: 1,
      id: 18,
      taskId: 18,
      workerId: 1,
      isActive: false,
      workTime: 13276,
      isComplete: false,
      TimeLines: [
        {
          id: 81,
          taskId: 18,
          startTime: "2022-07-08T10:10:59.392Z",
          endTime: "2022-07-08T10:11:12.668Z",
        },
      ],
    },
    {
      title: "testttt",
      description: "sdf",
      creatorId: 1,
      id: 19,
      taskId: 19,
      workerId: 1,
      isActive: false,
      workTime: 292716,
      isComplete: true,
      TimeLines: [
        {
          id: 80,
          taskId: 19,
          startTime: "2022-07-08T09:43:20.526Z",
          endTime: "2022-07-08T09:48:13.242Z",
        },
      ],
    },
  ],
  isLoading: false,
  isSearch: false,
  error: "",
  searchError: "",
};

export const getReports = createAsyncThunk(
  "tasks/getTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await tasksService.getTasks(userId);
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
    // [getTasks.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getTasks.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.tasks = payload;
    // },
    // [getTasks.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.error = payload;
    // },
  },
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
