import { Grid, Typography } from "@mui/material";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";

function DatePicker({ name, label, error, ...props }) {
  // eslint-disable-next-line no-undef

  return (
    <Grid item xs={12} sx={{ my: 2 }} minWidth={250}>
      <MUIDatePicker name={name} label={label} {...props} />
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
