import React from "react";
import {
  Grid,
  Step,
  Stepper,
  StepButton,
  Typography,
  Box,
} from "@mui/material";
const steps = [
  "Personal Detail",
  "Current Address",
  "Contact Information",
  "Immigration Information",
  "Driver's License",
  "Car Information",
  "Reference",
  "Emergenncy Contacts",
];
function Onboarding() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };
  return (
    <Grid container spacing={1}>
      <Grid item container xs={3}>
        <Box position={"fixed"}>
          <Typography variant="h2" color="initial" textAlign={"left"}>
            Not Started
          </Typography>
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {step}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>
      <Grid item container xs={3}></Grid>
      <Grid item sx={9} height={6000}>
        vcfdcvcs
      </Grid>
      <Grid />
    </Grid>
  );
}

export default Onboarding;
