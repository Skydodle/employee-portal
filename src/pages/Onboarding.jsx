import React from "react";
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
  const status = STATUS.NOT_STARTED;
  const [completed, setCompleted] = React.useState(
    status === STATUS.PENDING
      ? [true, true, true, true, true, true, true, true]
      : [false, false, false, false, false, false, false, false]
  );

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setCompleted((prev) =>
      prev.map((val, index) => (index === activeStep ? true : val))
    );
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
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
      <Box width="100%" maxWidth={800} padding={4}>
        {activeStep === sections.length ? (
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
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
              <Button onClick={handleNext}>
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
