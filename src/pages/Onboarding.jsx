import React, { useEffect } from "react";
import { STATUS, SECTION } from "../constants/onBoarding";
import { Typography, Box, Button, Grid } from "@mui/material";
import OnBoardingForm from "../components/OnBoardingForm";
import OnBoardingStepper from "../components/OnBoardingStepper";
import OnboardingHeader from "../components/OnBoardingHeader";
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
  const [hasError, setHasError] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

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
    <Box sx={{ display: { xs: "block", sm: "flex" } }}>
      <Typography
        variant="body2"
        color="white"
        textAlign={"center"}
        bgcolor={"primary.main"}
        sx={{
          display: { xs: "block", sm: "none" },
          p: 2,
          width: "100%",
        }}
      >
        {status}
      </Typography>
      <Box
        minWidth={250}
        height={"100vh"}
        borderRight={"1px solid lightgrey"}
        overflow={"auto"}
        sx={{ display: { xs: "none", sm: "block" } }}
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
          <OnBoardingStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            sections={sections}
            completed={completed}
          />
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
            <Box>
              <Box my={4}>
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
                spacing={2}
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
    </Box>
  );
}

export default Onboarding;
