import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Select from "./Select";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import Upload from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import { selectWorkAuthorization } from "../store/onBoardingSlice/onBoarding.selectors";
import { updateWorkAuthorization } from "../store/onBoardingSlice/onBoarding.slice";
import dayjs from "dayjs";
const options = [
  { label: "H1-B", value: "H1-b" },
  { label: "L2", value: "L2" },
  { label: "F1(CPT/OPT)", value: "F1" },
  { label: "H4", value: "H4" },
  { label: "Other", value: "other" },
];
function WorkAuthorization({ disabled }) {
  const workAuthorization = useSelector(selectWorkAuthorization);
  const dispatch = useDispatch();
  return (
    <Grid item xs={12}>
      <Select
        id="workAuthorization"
        name="workAuthorization"
        label={"What is your work authorization?"}
        value={workAuthorization?.workAuthorization}
        onChange={(e) =>
          dispatch(
            updateWorkAuthorization({ workAuthorization: e.target.value })
          )
        }
        disabled={disabled}
        options={options}
        required
      />
      {workAuthorization?.workAuthorization === "F1" && (
        <Upload
          label="Upload Receipt *"
          name="receipt"
          value={workAuthorization?.receipt}
          onChange={(e) =>
            dispatch(
              updateWorkAuthorization({
                receipt: URL.createObjectURL(e.target.files[0]),
              })
            )
          }
          id="receipt"
          required
          disabled={disabled}
        />
      )}
      {workAuthorization?.workAuthorization === "other" && (
        <TextField
          name="visaType"
          id="visaType"
          value={workAuthorization?.visaType}
          onChange={(e) =>
            dispatch(updateWorkAuthorization({ visaType: e.target.value }))
          }
          label="Visa Type *"
          disabled={disabled}
        />
      )}
      <DatePicker
        name="startDate"
        label="Start Date"
        value={dayjs(workAuthorization?.startDate)}
        onChange={(value) => {
          dispatch(
            updateWorkAuthorization({ startDate: value.format("MM/DD/YYYY") })
          );
        }}
        disabled={disabled}
      />
      <DatePicker
        name="endDate"
        label="End Date"
        disabled={disabled}
        value={dayjs(workAuthorization?.endDate)}
        onChange={(value) => {
          dispatch(
            updateWorkAuthorization({ endDate: value.format("MM/DD/YYYY") })
          );
        }}
      />
    </Grid>
  );
}

WorkAuthorization.propTypes = { disabled: PropTypes.bool };

export default WorkAuthorization;
