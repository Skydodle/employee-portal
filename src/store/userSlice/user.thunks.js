/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance'; // Ensure to import your axiosInstance
import { login } from './user.slice';

// Thunk for Logging In User
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData, {
        withCredentials: true
      });

      if (response.status === 200) {
        const data = response.data;

        // Store the JWT token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Dispatch the login action with the user data
        dispatch(login(data.user));
        return data.user;
      } else {
        throw new Error('Failed to login. Please try again later.');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for Validating Registration Token
export const validateToken = createAsyncThunk(
  'user/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/auth/validate-token?token=${token}`
      );

      if (response.status === 200) {
        return response.data; // Assuming this returns some data you need to handle
      } else {
        throw new Error('Invalid or expired registration token');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for Registering User
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ registToken, username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/auth/register',
        {
          token: registToken,
          username,
          email,
          password
        },
        {
          withCredentials: true // Include cookies if needed
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to register. Please try again later.');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
