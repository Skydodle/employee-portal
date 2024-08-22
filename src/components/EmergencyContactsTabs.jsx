import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmergencyContact from "./EmergencyContact";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  deleteEmergencyContact,
  updateEmergencyContact,
  addEmergencyContact,
} from "../store/onBoardingSlice/onBoarding.slice";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EmergencyCustomTabPanel({
  label,
  emergencyContacts,
  disabled,
}) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDelete = (index) => {
    dispatch(deleteEmergencyContact(index));
  };
  const handleAdd = () => {
    dispatch(addEmergencyContact());
  };
  const updateEmergency = (event, index) => {
    dispatch(
      updateEmergencyContact({
        index,
        data: { [event.target.name]: event.target.value },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label={label}>
          {emergencyContacts &&
            emergencyContacts.map((emergencyContact, index) => (
              <Tab
                key={`${label}-tab-${index}`}
                label={`${label} ${index + 1}`}
                {...a11yProps(0)}
              />
            ))}
          <Tab
            disabled={disabled}
            label="+"
            onClick={() => {
              if (emergencyContacts.length < 3) handleAdd();
            }}
          />
        </Tabs>
      </Box>
      {emergencyContacts?.map((emergencyContact, index) => (
        <CustomTabPanel
          key={`${label}-panel-${index}`}
          value={value}
          index={index}
        >
          <EmergencyContact
            emergencyContact={emergencyContact}
            disabled={disabled}
            onChange={(e) => updateEmergency(e, index)}
          />

          <Box ml={2}>
            <Button
              color="secondary"
              onClick={() => handleDelete(index)}
              sx={{
                visibility:
                  index === emergencyContacts.length - 1 && index !== 0
                    ? "visible"
                    : "hidden",
              }}
            >
              Delete
            </Button>
          </Box>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
EmergencyCustomTabPanel.propTypes = {
  label: PropTypes.string,
  emergencyContacts: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
};
