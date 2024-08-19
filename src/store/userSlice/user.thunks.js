/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './user.slice';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { dispatch }) => {
    // Simulated API call
    const response = await fakeApiLogin(userData);
    if (response.success) {
      dispatch(login(response.user));
    }
    return response.user;
  }
);

// Mock API function for demonstration purposes
const fakeApiLogin = (userData) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          success: true,
          user: { username: userData.username, email: userData.email }
        }),
      1000
    )
  );
};
