import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";
import TextField from "./TextField";
function EmergencyContact({ emergencyContact, disabled }) {
  function onChange() {}
  return (
    <>
      <TextField
        id="firstName"
        label="First Name"
        value={emergencyContact.firstName}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <TextField
        id="middeleName"
        label="Middle Name"
        value={emergencyContact.middleName}
        onChange={onChange}
        disabled={disabled}
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={emergencyContact.lastName}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <TextField
        id="emailAddress"
        label="Email Address"
        value={emergencyContact.emailAddress}
        onChange={onChange}
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="phoneNumber"
        label="Phone Number"
        value={emergencyContact.phoneNumber}
        onChange={onChange}
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="relationship"
        label="Relationship"
        value={emergencyContact.relationship}
        onChange={onChange}
        required
        isWholeLine
        disabled={disabled}
      />
    </>
  );
}

EmergencyContact.propTypes = {
  emergencyContact: PropTypes.object,
  disabled: PropTypes.bool,
};

export default EmergencyContact;
