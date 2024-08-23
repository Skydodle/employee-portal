import PropTypes from "prop-types";
import TextField from "../TextField";
function CurrentAddress({ disabled = false }) {
  return (
    <>
      <TextField
        name="street"
        id="street"
        label="Street"
        required
        isWholeLine
        disabled={disabled}
      />
      <TextField name="unit" id="unit" label="Unit" disabled={disabled} />
      <TextField
        name="city"
        id="city"
        label="City"
        required
        disabled={disabled}
      />
      <TextField
        name="state"
        id="state"
        label="State"
        required
        disabled={disabled}
      />
      <TextField
        name="zipCode"
        id="zipCode"
        label="Zip Code"
        required
        disabled={disabled}
      />
    </>
  );
}

CurrentAddress.propTypes = { disabled: PropTypes.bool };

export default CurrentAddress;
