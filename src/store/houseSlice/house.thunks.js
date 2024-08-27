import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance';

export const fetchHouseDetails = createAsyncThunk(
  'house/fetchHouseDetails',
  async (userHouseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/employee/house/${userHouseId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFacilityReports = createAsyncThunk(
  'house/fetchFacilityReports',
  async (houseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/employee/house/${houseId}/reports`
      );
      console.log('data:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const submitFacilityReport = createAsyncThunk(
  'house/submitFacilityReport',
  async ({ houseId, reportData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/employee/house/${houseId}/report`,
        reportData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'house/fetchComments',
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/employee/house/report/${reportId}/comments`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  'house/addComment',
  async ({ reportId, comment }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/employee/house/report/${reportId}/comment`,
        {
          description: comment
        }
      );
      return { reportId, comment: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  'house/updateComment',
  async ({ commentId, updatedComment }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/employee/house/comment/${commentId}`,
        {
          description: updatedComment
        }
      );
      return {
        reportId: response.data.reportId,
        updatedComment: response.data
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
