import PropTypes from "prop-types";
import TextField from "./TextField";
import { selectCarInformation } from "../store/onBoardingSlice/onBoarding.selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateCarInformation } from "../store/onBoardingSlice/onBoarding.slice";
function CarInformation({ disabled = false }) {
  const carInformation = useSelector(selectCarInformation);
  const dispatch = useDispatch();
  return (
    <>
      <TextField
        id="make"
        name="make"
        label="Make"
        value={carInformation?.make}
        onChange={(e) =>
          dispatch(updateCarInformation({ make: e.target.value }))
        }
        isWholeLine
        disabled={disabled}
      />
      <TextField
        id="model"
        name="model"
        label="Model"
        isWholeLine
        disabled={disabled}
        value={carInformation?.model}
        onChange={(e) =>
          dispatch(updateCarInformation({ model: e.target.value }))
        }
      />
      <TextField
        id="color"
        name="color"
        label="Color"
        isWholeLine
        disabled={disabled}
        value={carInformation?.color}
        onChange={(e) =>
          dispatch(updateCarInformation({ color: e.target.value }))
        }
      />
    </>
  );
}

CarInformation.propTypes = { disabled: PropTypes.bool };

export default CarInformation;
