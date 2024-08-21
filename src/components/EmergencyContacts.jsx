import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import EmergencyContactsTabs from "./EmergencyContactsTabs";
import profile from "../mock/data";
function EmergencyContacts({ disabled = false }) {
  return (
    <>
      <EmergencyContactsTabs
        emergencyContacts={profile.emergencyContacts}
        label="Emergency Contact"
        disabled={disabled}
      />
    </>
  );
}

EmergencyContacts.propTypes = { disabled: PropTypes.bool };

export default EmergencyContacts;
