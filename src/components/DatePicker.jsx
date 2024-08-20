import { Grid } from "@mui/material";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PropTypes from "prop-types";
function DatePicker({ ...props }) {
  return (
    <Grid item xs={12} sx={{ p: 1 }}>
      <MUIDatePicker
        defaultValue={dayjs("2022-04-17")}
        {...props}
        sx={{ m: 1 }}
      />
    </Grid>
  );
}

DatePicker.propTypes = { label: PropTypes.string };

export default DatePicker;
