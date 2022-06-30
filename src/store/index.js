import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import tasksSlice from "./slices/tasksSlice";

const rootReduser = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: tasksSlice,
});

export default configureStore({
  reducer: rootReduser,
});
