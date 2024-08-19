import React from 'react'
import {Box, Step, Stepper} from '@mui/material';
const steps = ['Personal Detail', "Current Address", "Contact Information", "Immigration Information", "Driver's License", "Car Information", "Reference", "Emergenncy Contacts"];
function Onboarding() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  return (
   <Box>
    <Stepper activeStep={activeStep} orientation="vertical">
    {steps.map((step, index) => (
        <Step key={step}>
            <StepLabel>{step}</StepLabel>
        </Step>
    ))}
    </Stepper>
   </Box>>
  )
}

export default Onboarding;