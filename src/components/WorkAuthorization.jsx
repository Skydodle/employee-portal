import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Select from "./Select";
import profile from "../mock/data";
const options = [
  { label: "H1-B", value: "H1-b" },
  { label: "L2", value: "L2" },
  { label: "F1(CPT/OPT)", value: "F1" },
  { label: "H4", value: "H4" },
  { label: "Other", value: "other" },
];
function WorkAuthorization({ disabled }) {
  function onChange() {}
  return (
    <Grid item xs={12}>
      <Select
        id="workAuthorization"
        label={"What is your work authorization?"}
        value={profile.workAuthorization}
        onChange={onChange}
        disabled={disabled}
        options={options}
      />
    </Grid>
  );
}

WorkAuthorization.propTypes = { disabled: PropTypes.bool };

export default WorkAuthorization;
