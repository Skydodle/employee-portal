import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Select from "../Select";
import TextField from "../TextField";
import DatePicker from "../DatePicker";
import dayjs from "dayjs";
import Upload from "../Upload";
import { useSelector, useDispatch } from "react-redux";
import { updateDriverLicense } from "../../store/onBoardingSlice/onBoarding.slice";
import { selectDriverLicense } from "../../store/onBoardingSlice/onBoarding.selectors";
const hasDriverLicenseOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];
function DriverLicense({ disabled = false }) {
  const driverLicense = useSelector(selectDriverLicense);
  const dispatch = useDispatch();
  return (
    <>
      <Select
        id="haveDriverLicense"
        name="haveDriverLicense"
        label={"Do you have a driver’s license?"}
        options={hasDriverLicenseOptions}
        onChange={(e) =>
          dispatch(
            updateDriverLicense({ hasDriverLicense: e.target.value === "true" })
          )
        }
        disabled={disabled}
        value={String(driverLicense?.hasDriverLicense)}
      />
      {driverLicense?.hasDriverLicense && (
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
            value={dayjs(driverLicense?.expirationDate)}
            onChange={(value) => {
              dispatch(
                updateDriverLicense({
                  expirationDate: value.format("MM/DD/YYYY"),
                })
              );
            }}
          />
          <Upload
            name="licenseCopy"
            id="licenseCopy"
            label="Upload Driver's License *"
            value={driverLicense?.licenseCopy}
            onChange={(e) =>
              dispatch(
                updateDriverLicense({
                  licenseCopy: URL.createObjectURL(e.target.files[0]),
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
