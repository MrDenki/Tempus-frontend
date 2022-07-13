import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import tasksSlice from "./slices/tasksSlice";
import reportSlice from "./slices/reportSlice";

const rootReduser = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: tasksSlice,
  report: reportSlice,
});

export default configureStore({
  reducer: rootReduser,
});
