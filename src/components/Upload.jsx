import PropTypes from "prop-types";
import { Grid, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Upload({
  value,
  required,
  name,
  error,
  id,
  label,
  disabled,
  ...props
}) {
  return (
    <Grid item xs={12} sx={{ my: 2 }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={disabled}
      >
        {label}
        <input
          style={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1,
          }}
          type="file"
          name={name}
          id={id}
          {...props}
        />
        <input hidden value={value} required={required} />
      </Button>
      <Button href={value} target="_blank">
        preview
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  );
}

Upload.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
};

export default Upload;
