import PropTypes from "prop-types";
import { STATUS } from "../constants/onBoarding";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectOnboardingFeedback } from "../store/onBoardingSlice/onBoarding.selectors";
function OnBoardingHeader({ status }) {
  const feedback = useSelector(selectOnboardingFeedback);
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
          <Typography variant="h3">{feedback}</Typography>
        </>
      );
    }
  }
}

OnBoardingHeader.propTypes = { status: PropTypes.oneOf(Object.values(STATUS)) };

export default OnBoardingHeader;
