import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance'; // Adjust the path if necessary


// Thunk to get onboarding status
export const getOnboardingStatus = createAsyncThunk(
  'onboarding/getOnboardingStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/employee/status');
      console.log(response.data)
      return response.data; // Assuming the response data is what you want
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get user profile
export const getUserProfile = createAsyncThunk(
  'employee/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/employee/profile');
      return response.data.user; // Assuming `data.user` contains the user profile
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to post user profile
export const postUserProfile = createAsyncThunk(
  'employee/postUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/employee/profile', profileData);
      return response.data.message; // Assuming `data.message` contains the success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
