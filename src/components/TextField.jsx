import PropTypes from "prop-types";
import { Grid, TextField as MUITextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../store/onBoardingSlice/onBoarding.slice";
import React from "react";
function TextField({
  id,
  name,
  label,
  onChange,
  isWholeLine = false,
  fullWidth = true,
  inputProps,
  ...props
}) {
  const value = useSelector((state) => state.onboarding.profile[name]) || "";
  const dispatch = useDispatch();
  const [hasError, setHasError] = React.useState(false);
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    } else {
      updateField(e, dispatch);
    }

    if (e.target.validity.valid) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };
  return (
    <Grid
      item
      md={isWholeLine ? 12 : 6}
      xs={12}
      sx={{ my: 2 }}
      minWidth={200}
      maxWidth={400}
    >
      <MUITextField
        fullWidth={fullWidth}
        value={value}
        id={id}
        name={name}
        onChange={handleChange}
        label={label}
        helperText={hasError ? `Please enter valid ${label}` : ""}
        error={hasError}
        inputProps={inputProps}
        {...props}
      />
    </Grid>
  );
}

TextField.propTypes = {
  isWholeLine: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
  inputProps: PropTypes.object,
  onChange: PropTypes.func,
};

export default TextField;
