export const selectOnboardingStatus = (state) => state.onboarding.status;
export const selectOnboardingProfile = (state) => state.onboarding.profile;
export const selectOnboardingFeedback = (state) =>
  state.onboarding.status.feedback;

export const selectWorkAuthorization = (state) =>
  state.onboarding.profile.workAuthorization;
export const selectCarInformation = (state) =>
  state.onboarding.profile.carInformation;
export const selectReference = (state) => state.onboarding.profile.reference;
export const selectEmergencyContacts = (state) =>
  state.onboarding.profile.emergencyContacts;
export const selectDriverLicense = (state) =>
  state.onboarding.profile.driverLicense;
export const selectPersonalInfo = (state) => state.onboarding.personalInfo;
export const selectAddress = (state) => state.onboarding.address;
export const selectContactInfo = (state) => state.onboarding.contactInfo;
export const selectCarInfo = (state) => state.onboarding.carInfo;
export const selectSSNInfo = (state) => state.onboarding.ssnInfo;
export const selectCitizenship = (state) => state.onboarding.citizenship;
export const selectProfilePicture = (state) =>
  state.onboarding.profile.profilePicture;
export const selectProfilePictureUrl = (state) =>
  state.onboarding.profile.profilePictureUrl;
export const selectProfileLoading = (state) => state.onboarding.loading;
// export const selectDriverLicense = (state) => state.onboarding.driverLicense;
// export const selectEmergencyContacts = (state) => state.onboarding.emergencyContacts;
