import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "./TextField";
function CurrentAddress({ disabled = false }) {
  function onChange() {}
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
        id="streetName"
        label="Street Name"
        value=""
        onChange={onChange}
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="unit"
        label="Unit"
        value=""
        onChange={onChange}
        disabled={disabled}
      />
      <TextField
        id="city"
        label="City"
        value=""
        onChange={onChange}
        required
        disabled={disabled}
      />
      <TextField
        id="state"
        label="State"
        value=""
        onChange={onChange}
        required
        disabled={disabled}
      />
      <TextField
        id="zipCode"
        label="Zip Code"
        value=""
        onChange={onChange}
        required
        disabled={disabled}
      />
    </Grid>
  );
}

CurrentAddress.propTypes = { disabled: PropTypes.bool };

export default CurrentAddress;
