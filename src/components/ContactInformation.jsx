import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import TextField from "./TextField";
import profile from "../mock/data";
function ContactInformation({ disabled = false }) {
  function onChange() {}
  return (
    <>
      <TextField
        id="emailAddress"
        label="Email Address"
        value={profile.emailAddress}
        onChange={onChange}
        isWholeLine
        disabled
      />
      <TextField
        id="phoneNumber"
        label="Phone Number"
        value={profile.phoneNumber}
        onChange={onChange}
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="workPhoneNumber"
        label="Work Phone Number"
        value={profile.workPhoneNumber}
        onChange={onChange}
        isWholeLine
        disabled={disabled}
      />
    </>
  );
}

ContactInformation.propTypes = { disabled: PropTypes.bool };

export default ContactInformation;
