import React from "react";
import PropTypes from "prop-types";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
function PersonalDetails({ disabled = false }) {
  function change() {}
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="stretch"
      wrap="wrap"
    >
      <TextField
        id="firstName"
        label="First Name"
        value={"fn"}
        onChange={change}
        disabled={disabled}
        required
      />
      <TextField
        id="middeleName"
        label="Middle Name"
        value={"mn"}
        onChange={change}
        disabled={disabled}
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={"ln"}
        onChange={change}
        disabled={disabled}
        required
      />
      <DatePicker
        defaultValue={dayjs("2022-04-17")}
        disabled={disabled}
        label="Date of Birth *"
      />
    </Grid>
  );
}

PersonalDetails.propTypes = { disabled: PropTypes.bool };

export default PersonalDetails;
