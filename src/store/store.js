/** @format */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/user.slice';
import onboardingReducer from './onBoardingSlice/onboarding.slice'
const store = configureStore({
  reducer: {
    user: userReducer,
    onboarding: onboardingReducer,
    // Add other reducers here as needed
  }
});

export default store;
