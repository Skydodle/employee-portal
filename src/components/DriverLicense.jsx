import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Select from "./Select";
import profile from "../mock/data";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import Upload from "./Upload";
const haveDriverLicenseOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
function DriverLicense({ disabled = false }) {
  function onChange() {}
  return (
    <>
      <Select
        id="haveDriverLicense"
        label={"Do you have a driver’s license?"}
        options={haveDriverLicenseOptions}
        onChange={onChange}
        disabled={disabled}
        value={profile.haveDriverLicense}
      />
      {profile.haveDriverLicense === "yes" && (
        <Grid item xs={12}>
          <TextField
            id="driverLicenseNumber"
            label="Drive License Number"
            value={profile.driverLicense.driverLicenseNumber}
            onChange={onChange}
            disabled={disabled}
            required
          />
          <DatePicker
            label="Expiration Date *"
            value={dayjs(profile.driverLicense.expirationDate)}
            onChange={onChange}
            disabled={disabled}
          />
          <Upload
            id="driverLicense"
            label="Upload Driver's License"
            disabled={disabled}
            required
          />
        </Grid>
      )}
    </>
  );
}

DriverLicense.propTypes = { disabled: PropTypes.bool };

export default DriverLicense;
