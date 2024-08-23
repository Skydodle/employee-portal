/** @format */

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUser = (state) => state.user.user;
export const selectTokenValidationStatus = (state) =>
  state.user.isRegisTokenValid;
export const selectIsRegistered = (state) => state.user.isRegistered;

