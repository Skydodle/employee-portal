import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import RadioGroup from "./RadioGroup";
import profile from "../mock/data";
import WorkAuthorization from "./WorkAuthorization";
import Upload from "./Upload";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";

const isUsCitizenOrResidentOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
const usCitizenshipStatusOptions = [
  { label: "Green Card", value: "green card" },
  { label: "Citizen", value: "citizen" },
];

function ImmigrationInformation({ disabled = false }) {
  function onChange() {}
  return (
    <>
      <RadioGroup
        label="Are you a citizen or permanent resident of the U.S?"
        id="isUsCitizenOrResident"
        options={isUsCitizenOrResidentOptions}
        disabled={disabled}
        value={profile.isUsCitizenOrResident}
        onChange={onChange}
      />
      {profile.isUsCitizenOrResident === "yes" && (
        <RadioGroup
          label=""
          id="usCitizenshipStatus"
          options={usCitizenshipStatusOptions}
          disabled={disabled}
          value={profile.usCitizenshipStatus}
          onChange={onChange}
        />
      )}
      {profile.isUsCitizenOrResident === "no" && (
        <WorkAuthorization disabled={disabled} />
      )}
      {profile.workAuthorization === "F1" && (
        <Upload
          label="Upload Receipt *"
          id="receipt"
          onChange={onChange}
          required
          disabled={disabled}
        />
      )}
      {profile.workAuthorization === "other" && (
        <TextField
          id="visaType"
          label="Visa Type *"
          value={profile.visaType}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      <DatePicker
        label="Start Date"
        value={dayjs("2022-04-17")}
        onChange={onChange}
        disabled={disabled}
      />
      <DatePicker
        label="End Date"
        value={dayjs("2022-04-17")}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
}

ImmigrationInformation.propTypes = { disabled: PropTypes.bool };

export default ImmigrationInformation;
