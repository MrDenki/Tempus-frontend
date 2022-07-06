import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../api/userService";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await userService.getUsers(query);
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
