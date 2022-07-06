import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksService from "../../api/tasksService";

const initialState = {
  tasks: [],
  isLoading: false,
  isSearch: false,
  error: "",
  searchError: "",
};

export const getTasks = createAsyncThunk(
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

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, { rejectWithValue }) => {
    try {
      const { data } = await tasksService.createTask(task);
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await tasksService.deleteTask(taskId);
      return taskId;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const { data } = await tasksService.updateTask(task);
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

// export const changeTask = createAsyncThunk(
//   "tasks/changeTask",
//   async (task, { rejectWithValue }) => {
//     try {
//       const { data } = await tasksService.updateTask(task);
//       return data;
//     } catch (error) {
//       const message = error.response.data.message;
//       return rejectWithValue(message);
//     }
//   }
// );

export const getSearchedTask = createAsyncThunk(
  "tasks/getSearchedTask",
  async (searchText, { rejectWithValue }) => {
    try {
      const { data } = await tasksService.searchTask(searchText);
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.tasks = payload;
    },
    [getTasks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [createTask.pending]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.tasks.push(payload);
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteTask.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [updateTask.pending]: (state) => {
      state.isLoading = true;
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const currentTask = state.tasks.find((task) => task.id === payload.id);
      const index = state.tasks.indexOf(currentTask);
      state.tasks[index] = payload;
    },
    [updateTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [getSearchedTask.pending]: (state) => {
      state.isSearch = true
    },
    [getSearchedTask.fulfilled]: (state, { payload }) => {
      state.isSearch = false;
      state.tasks = payload
    },
    [getSearchedTask.rejected]: (state, { payload }) => {
      state.isSearch = false;
      state.searchError = payload;
    },
  },
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
