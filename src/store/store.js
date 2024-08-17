/** @format */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/user.slice';

const store = configureStore({
  reducer: {
    user: userReducer
    // Add other reducers here as needed
  }
});

export default store;
