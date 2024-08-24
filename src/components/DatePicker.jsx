import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../store/onBoardingSlice/onBoarding.slice";
function DatePicker({ name, label, error, ...props }) {
  // eslint-disable-next-line no-undef
  const value = useSelector((state) => state.onboarding.profile[name]);
  const dispatch = useDispatch();
  return (
    <Grid item xs={12} sx={{ my: 2 }} minWidth={250}>
      <MUIDatePicker
        value={dayjs(value)}
        name={name}
        label={label}
        {...props}
      />
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  );
}

DatePicker.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default DatePicker;
