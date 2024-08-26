import PropTypes from "prop-types";
import TextField from "./TextField";

function EmergencyContact({ emergencyContact = {}, onChange, disabled }) {
  return (
    <>
      <TextField
        id="firstName"
        name="firstName"
        label="First Name"
        inputProps={{ pattern: "[A-Za-z ]+" }}
        value={emergencyContact.firstName || ""}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <TextField
        id="middeleName"
        name="middleName"
        label="Middle Name"
        inputProps={{ pattern: "[A-Za-z .]+" }}
        value={emergencyContact.middleName || ""}
        onChange={onChange}
        disabled={disabled}
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        inputProps={{ pattern: "[A-Za-z ]+" }}
        value={emergencyContact.lastName || ""}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <TextField
        id="emailAddress"
        name="emailAddress"
        label="Email Address"
        value={emergencyContact.emailAddress || ""}
        onChange={onChange}
        inputProps={{ type: "email" }}
        isWholeLine
        required
        disabled={disabled}
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        inputProps={{ type: "tel" }}
        value={emergencyContact.phoneNumber || ""}
        onChange={onChange}
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="relationship"
        name="relationship"
        label="Relationship"
        value={emergencyContact.relationship || ""}
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
  onChange: PropTypes.func,
};

export default EmergencyContact;
