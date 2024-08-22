import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "./TextField";
import profile from "../mock/data";
function CurrentAddress({ disabled = false }) {
  function onChange() {}
  return (
    <>
      <TextField
        id="streetName"
        label="Street Name"
        value={profile.streetName}
        onChange={onChange}
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="unit"
        label="Unit"
        value={profile.unit}
        onChange={onChange}
        disabled={disabled}
      />
      <TextField
        id="city"
        label="City"
        value={profile.city}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <TextField
        id="state"
        label="State"
        value={profile.state}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <TextField
        id="zipCode"
        label="Zip Code"
        value={profile.zipCode}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </>
  );
}

CurrentAddress.propTypes = { disabled: PropTypes.bool };

export default CurrentAddress;
