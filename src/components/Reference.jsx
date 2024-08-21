import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import EmergencyContact from "./EmergencyContact";
import profile from "../mock/data";
function Reference({ disabled = false }) {
  return (
    <>
      <EmergencyContact
        emergencyContact={profile.reference}
        disabled={disabled}
      />
    </>
  );
}

Reference.propTypes = { disabled: PropTypes.bool };

export default Reference;
