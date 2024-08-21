import { Grid, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
function DatePicker({ label, error, ...props }) {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  return (
    <Grid item xs={12} sx={{ m: 1, p: 1 }} minWidth={250}>
      <MUIDatePicker
        value={value}
        label={label}
        onChange={(newValue) => setValue(newValue)}
        {...props}
      />
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  );
}

DatePicker.propTypes = { error: PropTypes.string, label: PropTypes.string };

export default DatePicker;
