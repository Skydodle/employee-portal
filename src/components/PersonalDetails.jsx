import React from "react";
import PropTypes from "prop-types";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import profile from "../mock/data";
function PersonalDetails({ disabled = false }) {
  function onChange() {}
  return (
    <>
      <TextField
        id="firstName"
        label="First Name"
        value={profile.firstName}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <TextField
        id="middeleName"
        label="Middle Name"
        value={profile.middleName}
        onChange={onChange}
        disabled={disabled}
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={profile.lastName}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <DatePicker
        value={dayjs("2022-04-17")}
        disabled={disabled}
        onChange={onChange}
        label="Date of Birth *"
      />
    </>
  );
}

PersonalDetails.propTypes = { disabled: PropTypes.bool };

export default PersonalDetails;
