import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance'; // Adjust the path if necessary
import { jwtDecode } from "jwt-decode";


// Thunk to get onboarding status
export const getOnboardingStatus = createAsyncThunk(
  'onboarding/getOnboardingStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/employee/status');
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
      const token = localStorage.getItem('token');
      // console.log(token)
      const userProfile = response.data.user;
      // const decoded = jwtDecode(token);
      // userProfile.emailAddress = decoded.email; 

      return userProfile;  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to post user profile
// export const postUserProfile = createAsyncThunk(
//   'employee/postUserProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/employee/profile', profileData);
//       return response.data.message; // Assuming `data.message` contains the success message
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

export const postUserProfile = createAsyncThunk(
  'employee/postUserProfile',
  async ({ submitProfile, receiptFile }, { rejectWithValue }) => {
    try {
      // First, upload the visa document if a receipt file is provided
      // console.log(receiptFile)
      // if (receiptFile) {
      //   const formData = new FormData();
      //   formData.append('document', receiptFile);
      //   for (let pair of formData.entries()) {
      //     console.log(`${pair[0]}: ${pair[1]}`);
      //   }
      //   // const uploadResponse = await axiosInstance.post('/visa/employee', formData, {
      //   //   headers: {
      //   //     'Content-Type': 'multipart/form-data',
      //   //   },
      //   // });
        
      //   // Check if the upload was successful
      //   if (uploadResponse.status !== 200) {
      //     throw new Error('Failed to upload visa document.');
      //   }

      //   // // // Update the profile data with the document ID returned from the upload
      //   profileData.citizenship.optDocument = uploadResponse.data.documentId;
      //   console.log(profileData.citizenship.optDocument)
      // }
      console.log("Inside call:", submitProfile)
      // Then, post the user profile data
      const response = await axiosInstance.post('/employee/profile', submitProfile);

      // Return the success message
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
