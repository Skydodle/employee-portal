import PropTypes from "prop-types";
import { STATUS } from "../constants/onBoarding";
import { Typography } from "@mui/material";

function OnBoardingHeader({ status }) {
  switch (status) {
    case STATUS.NOT_STARTED: {
      return (
        <>
          <Typography variant="h3">Please fill the fields</Typography>
          <Typography variant="h4" color="error">
            * indicates a required field
          </Typography>
        </>
      );
    }
    case STATUS.PENDING: {
      return (
        <Typography variant="h3">
          Please wait for HR to review your application
        </Typography>
      );
    }
    case STATUS.REJECTED: {
      return (
        <>
        <Typography variant="h3">Please update the errored fields</Typography>
        <Typography variant="h3">Feedback here</Typography>
        </>

      );
    }
  }
}

OnBoardingHeader.propTypes = { status: PropTypes.oneOf(Object.values(STATUS)) };

export default OnBoardingHeader;
