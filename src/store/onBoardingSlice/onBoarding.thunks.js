import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptors/axiosInstance"; // Adjust the path if necessary
import { jwtDecode } from "jwt-decode";

// Thunk to get onboarding status
export const getOnboardingStatus = createAsyncThunk(
  "onboarding/getOnboardingStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/employee/status");
      return response.data; // Assuming the response data is what you want
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get user profile
export const getUserProfile = createAsyncThunk(
  "employee/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/employee/profile");
      const token = localStorage.getItem("token");
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
  "employee/postUserProfile",
  async ({ submitProfile, receiptFile, licenseFile }, { rejectWithValue }) => {
    try {
      // post the user profile data first
      // console.log("Inside call:", submitProfile)
      const response = await axiosInstance.post(
        "/employee/profile",
        submitProfile
      );

      const uploadFile = async (file, documentType) => {
        if (file) {
          const formData = new FormData();
          formData.append("document", file);
          formData.append("documentType", documentType);
          const uploadResponse = await axiosInstance.post(
            "/visa/employee",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (uploadResponse.status !== 200 && uploadResponse.status !== 201) {
            throw new Error(`Failed to upload ${documentType} document.`);
          }
          return uploadResponse.data.documentId;
        }
      };
      const receiptDocumentId = await uploadFile(receiptFile, "optReceipt");
      console.log("Receipt Document ID:", receiptDocumentId);

      // Upload license file
      const licenseDocumentId = await uploadFile(licenseFile, "driverLicense");
      console.log("License Document ID:", licenseDocumentId);
      // if (receiptFile) {
      //   const formData = new FormData();
      //   formData.append('document', receiptFile);
      //   for (let pair of formData.entries()) {
      //     console.log(`${pair[0]}: ${pair[1]}`);
      //   }
      //   const uploadResponse = await axiosInstance.post('/visa/employee', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });

      //   // Check if the upload was successful
      //   if (uploadResponse.status !== 200) {
      //     throw new Error('Failed to upload visa document.');
      //   }

      //   // profileData.citizenship.optDocument = uploadResponse.data.documentId;
      //   // console.log(profileData.citizenship.optDocument)
      // }

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
