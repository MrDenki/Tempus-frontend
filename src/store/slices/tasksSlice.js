import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksService from "../../api/tasksService";

const initialState = {
  tasks: [],
  selectedTaskId: undefined,
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
  async (task, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tasksService.createTask(task);
      dispatch(setSelecedTaskId(data.taskId));
      dispatch(getTasks(task.creatorId));
      // return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue, dispatch }) => {
    try {
      await tasksService.updateTask(task);
      dispatch(setSelecedTaskId(task.id));
      dispatch(getTasks(task.creatorId));
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

export const getSearchedTask = createAsyncThunk(
  "tasks/getSearchedTask",
  async ([userId, title], { rejectWithValue }) => {
    console.log(userId, title);
    try {
      const { data } = await tasksService.searchTask(userId, title);
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const assignWorker = createAsyncThunk(
  "tasks/assigneWorker",
  async ({ taskId, workerId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tasksService.assignWorker(taskId, workerId);
      // dispatch(getTasks());
      return { taskId, workerId };
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const unassignWorker = createAsyncThunk(
  "tasks/unassignWorker",
  async ({ taskId, workerId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tasksService.unassignWorker(taskId, workerId);
      // dispatch(getTasks());
      return { taskId, workerId };
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const startTask = createAsyncThunk(
  "tasks/startTask",
  async ({ taskId, userId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tasksService.startTask(taskId, userId);
      return data;
      // dispatch(getTasks(userId));
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async ({ taskId, userId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tasksService.completeTask(taskId, userId);
      // dispatch(getTasks(userId));
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(error.response.data);
    }
  }
);

export const finishTask = createAsyncThunk(
  "tasks/finishTask",
  async ({ taskId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tasksService.finishTask(taskId);
      // dispatch(getTasks(userId));
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
    setSelecedTaskId: (state, { payload }) => {
      if (payload) state.selectedTaskId = payload;
      else state.selectedTaskId = undefined;
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
      // state.isLoading = true;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      // state.tasks.push(payload);
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [deleteTask.pending]: (state) => {
      // state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [updateTask.pending]: (state) => {
      // state.isLoading = true;
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      // const currentTask = state.tasks.find((task) => task.id === payload.id);
      // const index = state.tasks.indexOf(currentTask);
      // state.tasks[index] = payload;
    },
    [updateTask.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [getSearchedTask.pending]: (state) => {
      state.isSearch = true;
    },
    [getSearchedTask.fulfilled]: (state, { payload }) => {
      state.isSearch = false;
      state.tasks = payload;
    },
    [getSearchedTask.rejected]: (state, { payload }) => {
      state.isSearch = false;
      state.searchError = payload;
    },
    [startTask.fulfilled]: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          task = { ...task, ...payload };
        }
        return task;
      });
    },
    [completeTask.fulfilled]: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          task = { ...task, ...payload };
        }
        return task;
      });
    },
    [completeTask.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.task.id) {
          task = { ...task, ...payload.task };
        }
        return task;
      });
    },
    [finishTask.fulfilled]: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          task = { ...task, ...payload };
        }
        return task;
      });
    },

    [assignWorker.fulfilled]: (state, { payload: { taskId, workerId } }) => {
      const editedTask = state.tasks.find((task) => task.id === taskId);
      editedTask.workers.push({ workerId });
    },
    [unassignWorker.fulfilled]: (state, { payload: { taskId, workerId } }) => {
      const editedTask = state.tasks.find((task) => task.id === taskId);
      editedTask.workers = editedTask.workers.filter(
        (worker) => worker.workerId !== workerId
      );
    },
  },
});

export const { clearError, setSelecedTaskId } = tasksSlice.actions;
export default tasksSlice.reducer;
