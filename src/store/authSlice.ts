// In your authSlice.ts or similar
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string | null;
    id: string | null;
    email: string | null;
    mobileNumber: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: { username: null, id: null, email: null, mobileNumber: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        id: string;
        email: string;
        mobileNumber: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerUser: (
      state,
      action: PayloadAction<{
        username: string;
        id: string;
        email: string;
        mobileNumber: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        username: null,
        id: null,
        email: null,
        mobileNumber: null,
      };
    },
    setUser: (
      state,
      action: PayloadAction<{
        username: string;
        id: string;
        email: string;
        mobileNumber: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { login, logout, registerUser, setUser } = authSlice.actions;
export default authSlice.reducer;
