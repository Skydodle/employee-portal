/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './user.slice';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Include cookies if needed
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Provide user-friendly error messages based on status code
        if (response.status === 401) {
          throw new Error('Invalid username or password. Please try again.');
        } else {
          throw new Error(
            errorData.message || 'Failed to login. Please try again later.'
          );
        }
      }

      const data = await response.json();

      // Store the JWT token, e.g., in localStorage or cookies
      localStorage.setItem('token', data.token);

      // Dispatch the login action with the user data
      dispatch(login(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
