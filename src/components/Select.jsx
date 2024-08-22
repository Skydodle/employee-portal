import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../store/onBoardingSlice/onBoarding.slice";
function Select({
  error,
  disabled,
  id,
  options = [],
  label,
  required,
  ...props
}) {
  const value = useSelector((state) => state.onboarding.profile[name]);
  const dispatch = useDispatch();
  return (
    <Grid item xs={6} sx={{ m: 2 }}>
      <FormControl fullWidth>
        <InputLabel id={id}>
          {label}
          {required && " * "}
        </InputLabel>
        <MUISelect
          labelId={id}
          value={value}
          label={label}
          onChange={(e) => updateField(e, dispatch)}
          disabled={disabled}
          required={required}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default Select;
