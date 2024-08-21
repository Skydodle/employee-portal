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
}) {
  const handleStep = (step) => () => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };
  return (
    <Box
      width={250}
      padding={3}
      sx={{ position: "fixed" }}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
      <Typography variant="h3" color="initial" textAlign={"left"} padding={1}>
        {STATUS.NOT_STARTED}
      </Typography>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
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
};

export default OnBoardingStepper;
