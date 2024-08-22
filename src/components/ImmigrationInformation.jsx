import React from "react";
import PropTypes from "prop-types";
import RadioGroup from "./RadioGroup";
import WorkAuthorization from "./WorkAuthorization";
import { useSelector } from "react-redux";
import { selectOnboardingProfile } from "../store/onBoardingSlice/onBoarding.selectors";

const isUsCitizenOrResidentOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
const usCitizenshipStatusOptions = [
  { label: "Green Card", value: "green card" },
  { label: "Citizen", value: "citizen" },
];

function ImmigrationInformation({ disabled = false }) {
  const profile = useSelector(selectOnboardingProfile);
  return (
    <>
      <RadioGroup
        label="Are you a citizen or permanent resident of the U.S?"
        id="isUsCitizenOrResident"
        name="isUsCitizenOrResident"
        options={isUsCitizenOrResidentOptions}
        disabled={disabled}
        required
      />
      {profile.isUsCitizenOrResident === "yes" && (
        <RadioGroup
          label=""
          name="usCitizenshipStatus"
          id="usCitizenshipStatus"
          options={usCitizenshipStatusOptions}
          disabled={disabled}
          required
        />
      )}
      {profile.isUsCitizenOrResident === "no" && (
        <WorkAuthorization disabled={disabled} />
      )}
    </>
  );
}

ImmigrationInformation.propTypes = { disabled: PropTypes.bool };

export default ImmigrationInformation;
