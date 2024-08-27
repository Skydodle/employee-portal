/** @format */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/user.slice';
import onboardingReducer from './onBoardingSlice/onboarding.slice';
import visaReducer from './visaSlice/visa.slice';
import houseReducer from './houseSlice/house.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    onboarding: onboardingReducer,
    visa: visaReducer,
    house: houseReducer
  }
});

export default store;
