import React from "react";
import PropTypes from "prop-types";
import EmergencyContactsTabs from "./EmergencyContactsTabs";
import { useSelector } from "react-redux";
import { selectEmergencyContacts } from "../store/onBoardingSlice/onBoarding.selectors";
function EmergencyContacts({ disabled = false }) {
  const emergencyContacts = useSelector(selectEmergencyContacts) || [];
  return (
    <>
      <EmergencyContactsTabs
        emergencyContacts={emergencyContacts}
        label="Emergency Contact"
        disabled={disabled}
      />
    </>
  );
}

EmergencyContacts.propTypes = { disabled: PropTypes.bool };

export default EmergencyContacts;
