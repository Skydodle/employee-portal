import React from "react";
import PropTypes from "prop-types";
import TextField from "./TextField";
import profile from "../mock/data";
function CarInformation({ disabled = false }) {
  function onChange() {}
  return (
    <>
      <TextField
        id="make"
        label="Make"
        value={profile.car.make}
        onChange={onChange}
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="model"
        label="Model"
        value={profile.car.model}
        onChange={onChange}
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="color"
        label="Color"
        value={profile.car.color}
        onChange={onChange}
        isWholeLine
        disabled={disabled}
      />
    </>
  );
}

CarInformation.propTypes = { disabled: PropTypes.bool };

export default CarInformation;
