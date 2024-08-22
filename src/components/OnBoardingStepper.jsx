import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stepper, Step, StepButton, Button, StepLabel } from "@mui/material";
import { STATUS } from "../constants/onBoarding";
function OnBoardingStepper({
  activeStep,
  setActiveStep,
  sections,
  errors = [],
  completed = [],
  orientation = "vertical",
}) {
  const handleStep = (step) => () => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };
  return (
    <Box p={4} textAlign={"center"} overflow={"visible"}>
      <Stepper nonLinear activeStep={activeStep} orientation={orientation}>
        {sections.map((section, index) => (
          <Step key={section} completed={completed[index]}>
            <StepButton color="inhererit" onClick={handleStep(index)}>
              <StepLabel error={errors[index]}> {section}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Button variant="text" color="secondary" sx={{ marginTop: 10 }}>
        Log Out
      </Button>
    </Box>
  );
}

OnBoardingStepper.propTypes = {
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  sections: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.bool),
  completed: PropTypes.arrayOf(PropTypes.bool),
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default OnBoardingStepper;
