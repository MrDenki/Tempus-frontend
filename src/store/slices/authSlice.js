import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../api/authService";

const initialState = {
  isAuth: localStorage.getItem("isAuth") || false,
  isLoading: false,
  currentUser: null,
  getCurrentUserError: "",
  signInError: "",
  signUpError: "",
  signOutError: "",
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const {
        data: { user },
      } = await authService.signIn(credentials);
      return user;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await authService.signUp(credentials);
      return user;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await authService.signOut();
      localStorage.removeItem("isAuth");
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getCurrentUser();
      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSignInError: (state) => {
      state.signInError = "";
    },
    clearSignUpError: (state) => {
      state.signUpError = "";
    },
    clearSignOutError: (state) => {
      state.signOutError = "";
    },
    clearGetCurrentUserError: (state) => {
      state.getCurrentUserError = "";
    },
    setAuth: (state, isAuth) => {
      state.isAuth = isAuth;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      localStorage.setItem("isAuth", true);
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    [signIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isAuth = false;
      state.currentUser = null;
      state.signInError = action.payload;
      localStorage.removeItem("isAuth");
    },

    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.currentUser = action.payload;
      localStorage.setItem("isAuth", true);
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.currentUser = null;
      state.signUpError = action.payload;
      localStorage.removeItem("isAuth");
    },

    [signOut.pending]: (state) => {
      state.isLoading = true;
    },
    [signOut.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.currentUser = null;
      localStorage.removeItem("isAuth");
    },
    [signOut.rejected]: (state, action) => {
      state.isLoading = false;
      state.signUpError = action.payload;
    },

    [getCurrentUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.currentUser = payload;
      localStorage.setItem("isAuth", true);
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.currentUser = null;
      state.getCurrentUserError = payload;
      localStorage.removeItem("isAuth");
    },
  },
});

export const {
  clearSignInError,
  clearSignUpError,
  clearSignOutError,
  clearGetCurrentUserError,
} = authSlice.actions;
export default authSlice.reducer;
