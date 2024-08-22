import { createSlice } from '@reduxjs/toolkit';
import { getOnboardingStatus, getUserProfile, postUserProfile } from './onBoarding.thunks'; // Adjust the path if necessary
import mockProfile from '../../mock/data'
import EmergencyContact from '../../components/EmergencyContact';
// Initial state
const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  contactInfo: {
    cellPhoneNumber: '',
    workPhoneNumber: ''
  },
  carInfo: {
    make: '',
    model: '',
    color: ''
  },
  ssnInfo: {
    ssn: '',
    dateOfBirth: '',
  },
  citizenship: {
    visaStatus: '',
    document: '',
    startDate: null,
    endDate: null,
    optDocument: null
  },
  driverLicense: {
    hasDriverLicense: false,
    licenseNumber: '',
    expirationDate: null,
    licenseCopy: ''
  },
  emergencyContacts: [
    {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: ''
    }
  ],
  feedback:'',
  status: null,
  profile: {mockProfile},
  loading: false,
  error: null,
};

// Onboarding slice
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // updatePersonalInfo: (state, action) => {
    //   state.personalInfo = { ...state.personalInfo, ...action.payload };
    // },
    // updateAddress: (state, action) => {
    //   state.address = { ...state.address, ...action.payload };
    // },
    // updateContactInfo: (state, action) => {
    //   state.contactInfo = { ...state.contactInfo, ...action.payload };
    // },
    // updateCarInfo: (state, action) => {
    //   state.carInfo = { ...state.carInfo, ...action.payload };
    // },
    // updateSSNInfo: (state, action) => {
    //   state.ssnInfo = { ...state.ssnInfo, ...action.payload };
    // },
    // updateCitizenship: (state, action) => {
    //   state.citizenship = { ...state.citizenship, ...action.payload };
    // },
    // updateDriverLicense: (state, action) => {
    //   state.driverLicense = { ...state.driverLicense, ...action.payload };
    // },
    // updateEmergencyContacts: (state, action) => {
    //   state.emergencyContacts = action.payload;
    // },
    update:(state, action) => {
      state.profile = {...state.profile, ...action.payload};
    },
    updateDriverLicense:(state, action) => {
      state.profile.driverLicense = {...state.profile.driverLicense, ...action.payload};
    },
    updateWorkAuthorization:(state, action) => {
      state.profile.workAuthorization = {...state.profile.workAuthorization, ...action.payload};
    },
    updateCarInformation:(state, action) => {
      state.profile.carInformation = {...state.profile.carInformation, ...action.payload};
    },
    updateReference:(state, action) => {
      state.profile.reference = {...state.profile.reference, ...action.payload};
    },
    updateEmergencyContact:(state, action) => {
      state.profile.emergencyContacts = state.profile.emergencyContacts.map((emergencyContact,index)=>index===action.payload.index?{...emergencyContact, ...action.payload.data}:emergencyContact);
    },
    deleteEmergencyContact:(state, action) => {
      state.profile.emergencyContacts = state.profile.emergencyContacts.filter((emergencyContact,index)=>index!==action.payload);
    },
    addEmergencyContact:(state) => {
      state.profile.emergencyContacts = [...state.profile.emergencyContacts, {
        firstName: "",
        lastName: "",
        middleName: "",
        relationship: "",
        emailAddress: "",
        phoneNumber: "",
      },];
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
        const profile = action.payload;
        state.loading = false;

        // Update the state with the user profile data
        state.personalInfo = {
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          middleName: profile.middleName || '',
          preferredName: profile.preferredName || '',
        };
        state.address = {
          street: profile.address?.street || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          zip: profile.address?.zip || ''
        };
        state.contactInfo = {
          cellPhoneNumber: profile.cellPhoneNumber || '',
          workPhoneNumber: profile.workPhoneNumber || ''
        };
        state.carInfo = {
          make: profile.car?.make || '',
          model: profile.car?.model || '',
          color: profile.car?.color || ''
        };
        state.ssnInfo = {
          ssn: profile.ssn || '',
          dateOfBirth: profile.dateOfBirth || ''
        };
        state.citizenship = {
          visaStatus: profile.citizenship?.visaStatus || '',
          document: profile.citizenship?.document || '',
          startDate: profile.citizenship?.startDate || null,
          endDate: profile.citizenship?.endDate || null,
          optDocument: profile.citizenship?.optDocument || null
        };
        state.driverLicense = {
          hasDriverLicense: profile.driverLicense?.hasDriverLicense || false,
          licenseNumber: profile.driverLicense?.licenseNumber || '',
          expirationDate: profile.driverLicense?.expirationDate || null,
          licenseCopy: profile.driverLicense?.licenseCopy || ''
        };
        state.emergencyContacts = profile.emergencyContacts || [
          {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            email: '',
            relationship: ''
          }
        ];
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
        const { personalInfo, address, contactInfo, carInfo, ssnInfo, citizenship, driverLicense, emergencyContacts } = action.payload;
        state.personalInfo = personalInfo;
        state.address = address;
        state.contactInfo = contactInfo;
        state.carInfo = carInfo;
        state.ssnInfo = ssnInfo;
        state.citizenship = citizenship;
        state.driverLicense = driverLicense;
        state.emergencyContacts = emergencyContacts;
      })
      .addCase(postUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default onboardingSlice.reducer;

export const {update, updateCarInformation, updateDriverLicense, updateReference,addEmergencyContact, updateEmergencyContact, updateWorkAuthorization, deleteEmergencyContact} = onboardingSlice.actions;
export const updateField = (e, dispatch) => dispatch(update({ [e.target.name]: e.target.value }))