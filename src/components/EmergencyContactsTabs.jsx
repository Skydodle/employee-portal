import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmergencyContact from "./EmergencyContact";
import Button from "@mui/material/Button";
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
  emergencyContacts: ec,
  disabled,
}) {
  const [emergencyContacts, setEmergencyContacts] = React.useState(ec);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDelete = (emergencyContact) => {
    setEmergencyContacts((prev) =>
      prev.filter((val) => val !== emergencyContact)
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label={label}>
          {emergencyContacts.map((emergencyContact, index) => (
            <Tab
              key={`${label}-tab-${index}`}
              label={`${label} ${index + 1}`}
              {...a11yProps(0)}
            />
          ))}
          <Button
            disabled={disabled}
            onClick={() =>
              emergencyContacts.length < 3 &&
              setEmergencyContacts((prev) => [
                ...prev,
                {
                  firstName: "",
                  lastName: "",
                  middleName: "",
                  relationship: "",
                  emailAddress: "",
                  phoneNumber: "",
                },
              ])
            }
          >
            +
          </Button>
        </Tabs>
      </Box>
      {emergencyContacts.map((emergencyContact, index) => (
        <CustomTabPanel
          key={`${label}-panel-${index}`}
          value={value}
          index={index}
        >
          <EmergencyContact
            emergencyContact={emergencyContact}
            disabled={disabled}
          />

          <Box ml={2}>
            <Button
              color="secondary"
              onClick={() => handleDelete(emergencyContact)}
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
