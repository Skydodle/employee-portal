import { createSlice } from '@reduxjs/toolkit';
import { getOnboardingStatus, getUserProfile, postUserProfile } from './onBoarding.thunks'; // Adjust the path if necessary

// Initial state
const initialState = {
  status: null,
  profile: null,
  loading: false,
  error: null,
};

// Onboarding slice
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
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

