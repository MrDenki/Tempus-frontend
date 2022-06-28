import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

const rootReduser = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default configureStore({
  reducer: rootReduser,
});
