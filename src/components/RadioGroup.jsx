import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import { RadioGroup as MUIRadioGroup, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function RadioGroup({
  error,
  label,
  id,
  options = [],
  value,
  onChange,
  ...props
}) {
  return (
    <Grid item sx={{ m: 2 }} minWidth={200} maxWidth={400} xs={12}>
      <FormControl>
        <FormLabel id={id}>{label}</FormLabel>
        <MUIRadioGroup
          aria-labelledby={id}
          name={label}
          value={value}
          onChange={onChange}
          row
        >
          {options.map((option) => (
            <FormControlLabel
              key={option?.label}
              value={option?.value}
              control={<Radio />}
              label={option?.label}
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
};

export default RadioGroup;
