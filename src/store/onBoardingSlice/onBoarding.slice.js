/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  getOnboardingStatus,
  getUserProfile,
  postUserProfile,
  updateProfilePicture,
  getProfilePictureUrl,
} from "./onBoarding.thunks"; // Adjust the path if necessary
import mockProfile from "../../mock/data";
// Initial state
const initialState = {
  status: null,
  profile: { profilePicture: "", profilePictureUrl: "" },
  // profile: {mockProfile},
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
      if (state.profile.emergencyContacts == null) {
        state.profile.emergencyContacts = [];
      }
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
    updateOnboardingStatus: (state, action) => {
      state.status.onboardingStatus = "Pending";
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

        // Update the state with the user profile data
        state.profile = {
          ...state.profile,
          // Basic personal information
          firstName: action.payload.firstName || "",
          middleName: action.payload.middleName || "",
          lastName: action.payload.lastName || "",
          preferredName: action.payload.preferredName || "",
          dateOfBirth: action.payload.dateOfBirth || "",
          gender: action.payload.gender || "",
          ssn: action.payload.ssn || "",
          profilePicture: action.payload.profilePicture || "",

          // Contact information
          phoneNumber: action.payload.cellPhoneNumber || "",
          workPhoneNumber: action.payload.workPhoneNumber || "",
          emailAddress: action.payload.emailAddress || "",

          // Address information
          unit: action.payload.address?.unit || "",
          street: action.payload.address?.street || "",
          city: action.payload.address?.city || "",
          state: action.payload.address?.state || "",
          zipCode: action.payload.address?.zip || "",

          // Car information
          carInformation: {
            ...state.profile.car,
            make: action.payload.car?.make || "",
            model: action.payload.car?.model || "",
            color: action.payload.car?.color || "",
          },

          // Citizenship information

          isUsCitizenOrResident:
            action.payload.citizenship?.visaStatus === "Green Card" ||
            action.payload.citizenship?.visaStatus === "Citizen"
              ? "yes"
              : "no",
          usCitizenshipStatus:
            action.payload.citizenship?.visaStatus === "Green Card" ||
            action.payload.citizenship?.visaStatus === "Citizen"
              ? action.payload.citizenship?.visaStatus
              : "",
          workAuthorization: {
            workAuthorization: action.payload.citizenship?.visaStatus || "",
            visaType: action.payload.citizenship?.visaType || "",
            startDate: action.payload.citizenship?.startDate || null,
            endDate: action.payload.citizenship?.endDate || null,
            receipt: action.payload.citizenship?.document || "",
            optDocument: action.payload.citizenship?.optDocument || null,
          },

          // Driver's license information
          driverLicense: {
            ...state.profile.driverLicense,
            hasDriverLicense:
              action.payload.driverLicense?.hasDriverLicense || false,
            driverLicenseNumber:
              action.payload.driverLicense?.licenseNumber || "",
            expirationDate: action.payload.driverLicense?.expirationDate || "",
            licenseCopy: action.payload.driverLicense?.licenseCopy || "",
          },
          // Reference
          reference: {
            firstName: action.payload.reference?.firstName || "",
            middleName: action.payload.reference?.middleName || "",
            lastName: action.payload.reference?.lastName || "",
            emailAddress: action.payload.reference?.email || "",
            relationship: action.payload.reference?.relationship || "",
            phoneNumber: action.payload.reference?.phone || "",
          },

          // Emergency contacts
          emergencyContacts: action.payload.emergencyContacts ||
            state.profile.emergencyContacts || [{}],

          // Onboarding status and feedback
          onboardingStatus: action.payload.onboardingStatus || "",
          feedback: action.payload.feedback || "",

          // Keep any other existing fields that are not in the payload
          ...state.profile,
        };
      })

      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //profile picture
    builder
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        const { profilePicture, profilePictureUrl } = action.payload;
        state.profile.profilePicture = profilePicture;
        state.profile.profilePictureUrl = profilePictureUrl;
      })
      .addCase(updateProfilePicture.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfilePictureUrl.fulfilled, (state, action) => {
        state.profile.profilePictureUrl = action.payload;
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
  updateOnboardingStatus,
  updateWorkAuthorization,
  deleteEmergencyContact,
} = onboardingSlice.actions;
export const updateField = (e, dispatch) =>
  dispatch(update({ [e.target.name]: e.target.value }));
