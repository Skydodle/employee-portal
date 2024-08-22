import PropTypes from "prop-types";
import TextField from "./TextField";

function ContactInformation({ disabled = false }) {
  return (
    <>
      <TextField
        id="emailAddress"
        name="emailAddress"
        label="Email Address"
        type="email"
        isWholeLine
        disabled
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        inputProps={{ type: "tel" }}
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField
        name="workPhoneNumber"
        id="workPhoneNumber"
        label="Work Phone Number"
        isWholeLine
        disabled={disabled}
      />
    </>
  );
}

ContactInformation.propTypes = { disabled: PropTypes.bool };

export default ContactInformation;
