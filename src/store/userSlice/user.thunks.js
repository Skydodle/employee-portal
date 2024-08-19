/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './user.slice';

// Thunk for Logging In User
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

// Thunk for Validating Registration Token
export const validateToken = createAsyncThunk(
  'user/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/auth/validate-token?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Invalid or expired registration token');
      }

      return await response.json(); // This could return any data you need to store, like validation status
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for Registering User
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Include cookies if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to register. Please try again later.'
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
