/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  getOnboardingStatus,
  getUserProfile,
  postUserProfile,
} from "./onBoarding.thunks"; // Adjust the path if necessary
import mockProfile from "../../mock/data";
// Initial state
const initialState = {
  status: null,
  profile: mockProfile,
  loading: false,
  error: null,
};

// Onboarding slice
const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
    update: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateDriverLicense: (state, action) => {
      state.profile.driverLicense = {
        ...state.profile.driverLicense,
        ...action.payload,
      };
    },
    updateWorkAuthorization: (state, action) => {
      state.profile.workAuthorization = {
        ...state.profile.workAuthorization,
        ...action.payload,
      };
    },
    updateCarInformation: (state, action) => {
      state.profile.carInformation = {
        ...state.profile.carInformation,
        ...action.payload,
      };
    },
    updateReference: (state, action) => {
      state.profile.reference = {
        ...state.profile.reference,
        ...action.payload,
      };
    },
    updateEmergencyContact: (state, action) => {
      state.profile.emergencyContacts = state.profile.emergencyContacts.map(
        (emergencyContact, index) =>
          index === action.payload.index
            ? { ...emergencyContact, ...action.payload.data }
            : emergencyContact
      );
    },
    deleteEmergencyContact: (state, action) => {
      state.profile.emergencyContacts = state.profile.emergencyContacts.filter(
        (emergencyContact, index) => index !== action.payload
      );
    },
    addEmergencyContact: (state) => {
      state.profile.emergencyContacts = [
        ...state.profile.emergencyContacts,
        {
          firstName: "",
          lastName: "",
          middleName: "",
          relationship: "",
          emailAddress: "",
          phoneNumber: "",
        },
      ];
    },
  },
  extraReducers: (builder) => {
    // Handle getOnboardingStatus actions
    builder
      .addCase(getOnboardingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnboardingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(getOnboardingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getUserProfile actions
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle postUserProfile actions
    builder
      .addCase(postUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming you might want to update the profile after a successful post
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(postUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default onboardingSlice.reducer;

export const {
  update,
  updateCarInformation,
  updateDriverLicense,
  updateReference,
  addEmergencyContact,
  updateEmergencyContact,
  updateWorkAuthorization,
  deleteEmergencyContact,
} = onboardingSlice.actions;
export const updateField = (e, dispatch) =>
  dispatch(update({ [e.target.name]: e.target.value }));
