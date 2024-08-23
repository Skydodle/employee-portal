import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import { RadioGroup as MUIRadioGroup, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../store/onBoardingSlice/onBoarding.slice";
function RadioGroup({
  name,
  error,
  label,
  id,
  options = [],
  required,
  ...props
}) {
  const value = useSelector((state) => state.onboarding.profile[name]) || '';
  const dispatch = useDispatch();
  return (
    <Grid item sx={{ m: 2 }} minWidth={200} maxWidth={400} xs={12}>
      <FormControl>
        <FormLabel id={id}>{label}</FormLabel>
        <MUIRadioGroup
          aria-labelledby={id}
          id={id}
          name={name}
          value={value}
          onChange={(e) => updateField(e, dispatch)}
          row
        >
          {options.map((option) => (
            <FormControlLabel
              key={option?.label}
              value={option?.value}
              control={<Radio />}
              label={option?.label}
              required={required}
              {...props}
            />
          ))}
        </MUIRadioGroup>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  );
}

RadioGroup.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default RadioGroup;
