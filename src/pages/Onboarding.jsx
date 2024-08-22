import React, { useEffect, useState } from "react";
import { STATUS, SECTION } from "../constants/onBoarding";
import { Typography, Box, Button, Grid } from "@mui/material";
import OnBoardingForm from "../components/OnBoardingForm";
import OnBoardingStepper from "../components/OnBoardingStepper";
import OnboardingHeader from "../components/OnBoardingHeader";
import { useDispatch, useSelector } from 'react-redux';
import { getOnboardingStatus,selectOnboardingStatus, getUserProfile} from '../store';
import { Navigate} from 'react-router-dom';
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
  const [status, setStatus] = React.useState(STATUS.NOT_STARTED);
  const [completed, setCompleted] = React.useState(
    status === STATUS.PENDING
      ? [true, true, true, true, true, true, true, true]
      : [false, false, false, false, false, false, false, false]
  );
  const statusTest = useSelector(selectOnboardingStatus);
  const [hasError, setHasError] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnboardingStatus());
    dispatch(getUserProfile());

  }, [dispatch]);
  if (statusTest && statusTest.onboardingStatus === 'Approved') {
    return <Navigate to="/profile" />;
  }
  const profile = useSelector(state => state.onboarding);
  console.log('Profile state:', profile);

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
  useEffect(() => {
    if (activeStep === sections.length) setStatus(STATUS.PENDING);
  }, [activeStep]);
  return (
    <Box display="flex">
      {statusTest && <p>Onboarding Status: {statusTest.onboardingStatus}</p>}
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
              <Button type="submit">
                {activeStep === sections.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      <div>
      <h2>Profile Information</h2>
      <div>
        <h3>Personal Info</h3>
        <p>First Name: {profile.personalInfo.firstName}</p>
        <p>Last Name: {profile.personalInfo.lastName}</p>
        <p>Middle Name: {profile.personalInfo.middleName}</p>
        <p>Preferred Name: {profile.personalInfo.preferredName}</p>
      </div>

      <div>
        <h3>Address</h3>
        <p>Street: {profile.address.street}</p>
        <p>City: {profile.address.city}</p>
        <p>State: {profile.address.state}</p>
        <p>ZIP: {profile.address.zip}</p>
      </div>

      <div>
        <h3>Contact Info</h3>
        <p>Cell Phone Number: {profile.contactInfo.cellPhoneNumber}</p>
        <p>Work Phone Number: {profile.contactInfo.workPhoneNumber}</p>
      </div>

      <div>
        <h3>Car Info</h3>
        <p>Make: {profile.carInfo.make}</p>
        <p>Model: {profile.carInfo.model}</p>
        <p>Color: {profile.carInfo.color}</p>
      </div>

      <div>
        <h3>SSN Info</h3>
        <p>SSN: {profile.ssnInfo.ssn}</p>
        <p>Date of Birth: {profile.ssnInfo.dateOfBirth}</p>
      </div>

      <div>
        <h3>Citizenship</h3>
        <p>Visa Status: {profile.citizenship.visaStatus}</p>
        <p>Document: {profile.citizenship.document}</p>
        <p>Start Date: {profile.citizenship.startDate}</p>
        <p>End Date: {profile.citizenship.endDate}</p>
        <p>OPT Document: {profile.citizenship.optDocument}</p>
      </div>

      <div>
        <h3>Driver License</h3>
        <p>Has Driver License: {profile.driverLicense.hasDriverLicense ? 'Yes' : 'No'}</p>
        <p>License Number: {profile.driverLicense.licenseNumber}</p>
        <p>Expiration Date: {profile.driverLicense.expirationDate}</p>
        <p>License Copy: {profile.driverLicense.licenseCopy}</p>
      </div>

      <div>
        <h3>Emergency Contacts</h3>
        {profile.emergencyContacts.map((contact, index) => (
          <div key={index}>
            <p>First Name: {contact.firstName}</p>
            <p>Last Name: {contact.lastName}</p>
            <p>Middle Name: {contact.middleName}</p>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <p>Relationship: {contact.relationship}</p>
          </div>
        ))}
      </div>
    </div>
    </Box>
    
  );
}

export default Onboarding;
