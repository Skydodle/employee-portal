import PropTypes from "prop-types";
import { Grid, TextField as MUITextField, Typography } from "@mui/material";
function TextField({ error, isWholeLine = false, fullWidth = true, ...props }) {
  return (
    <Grid
      item
      md={isWholeLine ? 12 : 6}
      xs={12}
      sx={{ p: 2 }}
      minWidth={200}
      maxWidth={400}
    >
      <MUITextField {...props} fullWidth={fullWidth} />
      {error && <Typography color="error">{error}</Typography>}
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
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
};

export default TextField;
