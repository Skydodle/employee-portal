/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { validateToken, registerUser } from './user.thunks';

const initialState = {
  user: null,
  isAuthenticated: false,
  isRegisTokenValid: false,
  isRegistered: false,

  // New state to track registration status
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.fulfilled, (state) => {
        state.isRegisTokenValid = true; // Mark registration token as valid
      })
      .addCase(validateToken.rejected, (state) => {
        state.isRegisTokenValid = false; // Mark registration token as invalid
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistered = true; // Mark registration as successful
        state.user = action.payload; // Save the registered user data
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRegistered = false; // Mark registration as failed
      })
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
