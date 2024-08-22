import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Select from "./Select";
import profile from "../mock/data";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import Upload from "./Upload";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  updateDriverLicense,
} from "../store/onBoardingSlice/onBoarding.slice";
import { selectDriverLicense } from "../store/onBoardingSlice/onBoarding.selectors";
const hasDriverLicenseOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
function DriverLicense({ disabled = false }) {
  const driverLicense = useSelector(selectDriverLicense);
  const dispatch = useDispatch();
  console.log(driverLicense);
  return (
    <>
      <Select
        id="haveDriverLicense"
        name="haveDriverLicense"
        label={"Do you have a driver’s license?"}
        options={hasDriverLicenseOptions}
        onChange={(e) =>
          dispatch(updateDriverLicense({ hasDriverLicense: e.target.value }))
        }
        disabled={disabled}
        value={driverLicense?.hasDriverLicense}
      />
      {driverLicense?.hasDriverLicense === "yes" && (
        <Grid item xs={12}>
          <TextField
            name="driverLicenseNumber"
            id="driverLicenseNumber"
            label="Drive License Number"
            value={driverLicense?.driverLicenseNumber}
            onChange={(e) =>
              dispatch(
                updateDriverLicense({ driverLicenseNumber: e.target.value })
              )
            }
            disabled={disabled}
            required
          />
          <DatePicker
            name="expirationDate"
            label="Expiration Date *"
            disabled={disabled}
            value={dayjs(driverLicense?.expirationDate || new Date())}
            onChange={(value) => {
              dispatch(
                updateDriverLicense({
                  expirationDate: value.format("MM/DD/YYYY"),
                })
              );
            }}
          />
          <Upload
            name="driverLicense"
            id="driverLicense"
            label="Upload Driver's License *"
            value={driverLicense?.driverLicense}
            onChange={(e) =>
              dispatch(
                updateDriverLicense({
                  driverLicense: URL.createObjectURL(e.target.files[0]),
                })
              )
            }
            disabled={disabled}
            required
          />
        </Grid>
      )}
    </>
  );
}

DriverLicense.propTypes = { disabled: PropTypes.bool };

export default DriverLicense;
