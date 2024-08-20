import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stepper, Step, StepButton } from "@mui/material";
import { STATUS } from "../constants/onBoarding";
function OnBoardingStepper({ activeStep, setActiveStep, sections }) {
  const handleStep = (step) => () => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };
  return (
    <Box width={250} padding={5} sx={{ position: "fixed" }}>
      <Box>
        <Typography variant="h3" color="initial" textAlign={"left"} padding={1}>
          {STATUS.NOT_STARTED}
        </Typography>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {sections.map((section, index) => (
            <Step key={section}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {section}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

OnBoardingStepper.propTypes = {
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  sections: PropTypes.arrayOf(PropTypes.string),
};

export default OnBoardingStepper;
