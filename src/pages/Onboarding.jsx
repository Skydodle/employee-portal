import React, { useEffect, useState } from "react";
import { STATUS, SECTION } from "../constants/onBoarding";
import { Typography, Box, Button, Grid } from "@mui/material";
import OnBoardingForm from "../components/OnBoardingForm";
import OnBoardingStepper from "../components/OnBoardingStepper";
import OnboardingHeader from "../components/OnBoardingHeader";
import { useDispatch, useSelector } from 'react-redux';
import { getOnboardingStatus, selectOnboardingStatus, getUserProfile,postUserProfile } from '../store';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { update } from "../store";
const sections = [
  SECTION.PERSONAL_DETAILS,
  SECTION.CURRENT_ADDRESS,
  SECTION.CONTACT_INFORMATION,
  SECTION.IMMIGRATION_INFORMATION,
  SECTION.DRIVER_LICENSE,
  SECTION.CAR_INFORMATION,
  SECTION.REFERENCE,
  SECTION.EMERGENCY_CONTACTS,
];

function Onboarding() {
  const [status, setStatus] = useState(STATUS.NOT_STARTED);
  const [completed, setCompleted] = useState(
    status === STATUS.PENDING
      ? [true, true, true, true, true, true, true, true]
      : [false, false, false, false, false, false, false, false]
  );
  const [hasError, setHasError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const profile = useSelector((state) => state.onboarding.profile);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getOnboardingStatus())
      .then((action) => {
        const onboardingStatus = action.payload.onboardingStatus;
        setStatus(onboardingStatus);
        if (onboardingStatus === STATUS.PENDING) {
          setCompleted([true, true, true, true, true, true, true, true]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch onboarding status:", error);
      });
      const token = localStorage.getItem('token'); // Adjust this to where your token is stored
      if (token) {
        const decoded = jwtDecode(token);
        dispatch(update({ emailAddress: decoded.email }));
      }
    dispatch(getUserProfile());
  }, [dispatch]);

  if (status === STATUS.APPROVED) {
    return <Navigate to="/profile" />;
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setCompleted((prev) =>
      prev.map((val, index) => (index === activeStep ? true : val))
    );
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const blobUrlToFile = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      // Generate a file name and type, you can adjust these as needed
      const fileName = 'receipt.pdf'; // Adjust the file name if needed
      const fileType = blob.type || 'application/pdf'; // Default to PDF if type is unknown
      return new File([blob], fileName, { type: fileType });
    } catch (error) {
      console.error('Error converting blob URL to file:', error);
      throw new Error('Failed to convert blob URL to file.');
    }
  };


  const transformToBackendProfile = (profile) => {
    return {
      firstName: profile.firstName || '',
      middleName: profile.middleName || '',
      lastName: profile.lastName || '',
      preferredName: profile.preferredName || '',
      dateOfBirth: profile.dateOfBirth || '',
      gender: profile.gender || '',
      ssn: profile.ssn || '',
      profilePicture: profile.profilePicture || '',
      
      cellPhoneNumber: profile.phoneNumber || '',
      workPhoneNumber: profile.workPhoneNumber || '',
      emailAddress: profile.emailAddress || '',
      
      address: {
        unit: profile.unit || '',
        street: profile.street || '',
        city: profile.city || '',
        state: profile.state || '',
        zip: profile.zipCode || '',
      },
      
      car: {
        make: profile.carInformation?.make || '',
        model: profile.carInformation?.model || '',
        color: profile.carInformation?.color || '',
      },
      
      citizenship: {
        visaStatus: profile.workAuthorization?.workAuthorization || profile.usCitizenshipStatus || '',
        visaType: profile.workAuthorization?.visaType || '',
        startDate: profile.workAuthorization?.startDate || null,
        endDate: profile.workAuthorization?.endDate || null,
        document: profile.workAuthorization?.receipt || '',
      },
      
      driverLicense: {
        hasDriverLicense: profile.driverLicense?.hasDriverLicense || false,
        licenseNumber: profile.driverLicense?.driverLicenseNumber || '',
        expirationDate: profile.driverLicense?.expirationDate || '',
        licenseCopy: profile.driverLicense?.licenseCopy || '',
      },
      
      reference: {
        firstName: profile.reference?.firstName || '',
        middleName: profile.reference?.middleName || '',
        lastName: profile.reference?.lastName || '',
        emailAddress: profile.reference?.emailAddress || '',
        relationship: profile.reference?.relationship || '',
        phoneNumber: profile.reference?.phoneNumber || '',
      },
      
      emergencyContacts: profile.emergencyContacts.map(contact => ({
        firstName: contact.firstName || '',
        middleName: contact.middleName || '',
        lastName: contact.lastName || '',
        relationship: contact.relationship || '',
        emailAddress: contact.emailAddress || '',
        phoneNumber: contact.phoneNumber || '',
      })),
  
    };
  };
  const handleFinish = async () => {
    const receiptBlobUrl = profile.workAuthorization?.receipt;
    console.log(receiptBlobUrl)
    try {
      let file = null;

      if (receiptBlobUrl && receiptBlobUrl.startsWith('blob:')) {
        file = await blobUrlToFile(receiptBlobUrl);
      } else {
        // Handle the case where receiptBlobUrl is already a File object
        file = receiptBlobUrl;
      }
      // Dispatch the thunk with profile and file
      const submitProfile = transformToBackendProfile(profile);
      console.log(profile)
      console.log(submitProfile)
      // dispatch(postUserProfile({ submitProfile, receiptFile: file })).unwrap();
      // dispatch(getOnboardingStatus());

      // Handle success here, e.g., redirect or show a success message
    } catch (error) {
      console.error('Failed to submit profile:', error);
      setHasError(true);

      // Handle error here, e.g., show an error message
    }
    // dispatch(postUserProfile(profile))
    //   .unwrap()
    //   .then((message) => {
    //     console.log('Profile submitted successfully:', message);
    //     // You can handle success here, like redirecting to another page or showing a success message
    //   })
    //   .catch((error) => {
    //     console.error('Failed to submit profile:', error);
    //     // Handle error here, like showing an error message
    //   });
  };

  useEffect(() => {
    if (activeStep === sections.length) setStatus(STATUS.PENDING);
  }, [activeStep]);

  return (
    <Box display="flex">
      <Box
        minWidth={250}
        height={"100vh"}
        borderRight={"1px solid lightgrey"}
        overflow={"auto"}
      >
        <Box
          width={250}
          sx={{ position: "fixed" }}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            variant="h3"
            color="white"
            textAlign={"center"}
            bgcolor={"primary.main"}
            p={5}
          >
            {status}
          </Typography>
          <Box m={4} textAlign={"center"}>
            <OnBoardingStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              sections={sections}
              completed={completed}
            />
          </Box>
        </Box>
      </Box>
      <Box
        width="100%"
        maxWidth={800}
        padding={4}
        component={"form"}
        onSubmit={handleNext}
        noValidate
      >
        {activeStep === sections.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Please wait for HR to review your application
            </Typography>
          </>
        ) : (
          <React.Fragment>
            <Box padding={2}>
              <Box margin={2}>
                <OnboardingHeader status={status} />
              </Box>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                alignContent="flex-start"
                wrap="wrap"
                minHeight={500}
              >
                <OnBoardingForm
                  disabled={status === STATUS.PENDING}
                  section={sections[activeStep]}
                />
              </Grid>
              {hasError && (
                <Typography variant="error" sx={{ m: 2 }}>
                  Some field is invalid
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "space-around",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              {/* <Button type="submit">
                {activeStep === sections.length - 1 ? "Finish" : "Next"}
              </Button> */}
              {activeStep === sections.length - 1 ? (
                <Button type="submit" onClick={handleFinish}>
                  Finish
                </Button>
              ) : (
                <Button type="submit">
                  Next
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default Onboarding;
