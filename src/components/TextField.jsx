import PropTypes from "prop-types";
import { Grid, TextField as MUITextField } from "@mui/material";
function TextField({ isWholeLine = false, ...props }) {
  return (
    <Grid item xs={isWholeLine ? 12 : 6} sx={{ p: 1 }}>
      <MUITextField {...props} sx={{ m: 1 }} fullWidth />
    </Grid>
  );
}

TextField.propTypes = {
  isWholeLine: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default TextField;
