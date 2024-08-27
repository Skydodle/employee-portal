import React, { useEffect, useState } from "react";
import { selectProfilePicture } from "../store";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../interceptors/axiosInstance";
import { getProfilePictureUrl } from "../store/onBoardingSlice/onBoarding.thunks";
import Emergency from "../components/Emergency";
import styles from "./Profile.module.css";
import {
  AccordionDetails,
  Accordion,
  AccordionActions,
  AccordionSummary,
  Button,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";

const mockData = {
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  car: {
    make: "Toyota",
    model: "Camry",
    color: "Blue",
  },
  citizenship: {
    visaStatus: "Citizen",
    document: "",
    startDate: null,
    endDate: null,
    optDocument: { i983: {} },
  },
  driverLicense: {
    hasDriverLicense: true,
    licenseNumber: "D1234567",
    expirationDate: "2030-01-01T00:00:00.000Z",
  },
  _id: "66c8ca4df751cd97d4f77439",
  userId: {
    _id: "66c8ca4df751cd97d4f77437",
    email: "employee@company.com",
  },
  onboardingStatus: "Approved",
  profilePicture: "profilePicture-employeeTest123.png",
  firstName: "John",
  lastName: "Doe",
  middleName: "M.",
  preferredName: "Johnny",
  cellPhoneNumber: "555-123-4567",
  workPhoneNumber: "555-987-6543",
  ssn: "123-45-6789",
  dateOfBirth: "1990-01-01T00:00:00.000Z",
  gender: "Male",
  emergencyContacts: [
    {
      firstName: "Jane",
      lastName: "Doe",
      middleName: "",
      phone: "555-123-9999",
      email: "jane.doe@example.com",
      relationship: "Spouse",
      _id: "66c8ca4df751cd97d4f7743a",
    },
  ],
  feedback: "",
  __v: 0,
};

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadAvatar from "../components/UploadAvatar";
export default function Profile() {
  const dispatch = useDispatch();
  const profilePicture = useSelector(selectProfilePicture);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingEmployment, setIsEditingEmployment] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);

  const [profileData, setProfileData] = useState({ citizenship: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("/employee/info");
        // const response = { data: mockData };
        setProfileData(response.data);
        dispatch(getProfilePictureUrl(response.data.profilePicture));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = (section) => {
    switch (section) {
      case "name":
        setIsEditingName(true);
        break;
      case "address":
        setIsEditingAddress(true);
        break;
      case "contact":
        setIsEditingContact(true);
        break;
      case "employment":
        setIsEditingEmployment(true);
        break;
      case "emergency":
        setIsEditingEmergency(true);
        break;
      default:
        break;
    }
  };

  const handleCancelClick = (section) => {
    const confirmCancel = window.confirm(
      "Do you want to discard all of your changes?"
    );
    if (confirmCancel) {
      switch (section) {
        case "name":
          setIsEditingName(false);
          break;
        case "address":
          setIsEditingAddress(false);
          break;
        case "contact":
          setIsEditingContact(false);
          break;
        case "employment":
          setIsEditingEmployment(false);
          break;
        case "emergency":
          setIsEditingEmergency(false);
          break;
        default:
          break;
      }
      // Logic to undo changes can be added here
    }
  };

  const handleSaveClick = async (section) => {
    try {
      let dataToUpdate = {};
      switch (section) {
        case "address":
          dataToUpdate = {
            address: {
              street: profileData.address.street,
              city: profileData.address.city,
              state: profileData.address.state,
              zip: profileData.address.zip,
            },
          };
          setIsEditingAddress(false);
          break;
        case "contact":
          dataToUpdate = {
            cellPhoneNumber: profileData.cellPhoneNumber,
            workPhoneNumber: profileData.workPhoneNumber,
          };
          setIsEditingContact(false);
          break;
        case "employment":
          dataToUpdate = {
            citizenship: {
              visaStatus: profileData.citizenship.visaStatus,
              startDate: profileData.citizenship.startDate,
              endDate: profileData.citizenship.endDate,
            },
          };
          setIsEditingEmployment(false);
          break;
        case "emergency":
          dataToUpdate = {
            emergencyContacts: profileData.emergencyContacts,
          };
          setIsEditingEmergency(false);
          break;
        default:
          break;
      }

      const response = await axiosInstance.put("/employee/info", dataToUpdate);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  const handleEditEmergencyContact = (index) => {
    setIsEditingEmergency(true);
  };

  const handleSaveEmergencyContact = (updatedContact) => {
    setIsEditingEmergency(false);
  };

  const handleCancelEmergencyContact = () => {
    setIsEditingEmergency(false);
  };

  return (
    <div className={styles.page}>
      <h1>Personal Information</h1>
      <UploadAvatar />
      {/* Name Section */}
      <Accordion className={styles.profileSection} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="name-panel"
        >
          Name
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.profileField}>
            <label>First Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              defaultValue={profileData.firstName}
            />
          </div>
          <div className={styles.profileField}>
            <label>Middle Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              defaultValue={profileData.middleName}
            />
          </div>
          <div className={styles.profileField}>
            <label>Last Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              defaultValue={profileData.lastName}
            />
          </div>
          <div className={styles.profileField}>
            <label>Preferred Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              defaultValue={profileData.preferredName}
            />
          </div>
          <div className={styles.profileField}>
            <label>Profile Picture:</label>
            {!isEditingName && (
              <img src={`/${profileData.profilePicture}`} alt="Profile" />
            )}
          </div>
          <div className={styles.profileField}>
            <label>Email:</label>
            <TextField
              type="email"
              disabled={!isEditingName}
              defaultValue={profileData.userId.email}
            />
          </div>
          <div className={styles.profileField}>
            <label>SSN:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              defaultValue={profileData.ssn}
            />
          </div>
          <div className={styles.profileField}>
            <label>Date of Birth:</label>
            <TextField
              type="date"
              disabled={!isEditingName}
              defaultValue={
                new Date(profileData.dateOfBirth).toISOString().split("T")[0]
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>Gender:</label>
            <Select disabled={!isEditingName} defaultValue={profileData.gender}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </div>
          <AccordionActions>
            {isEditingName ? (
              <>
                <Button
                  onClick={() => handleCancelClick("name")}
                  color={"error"}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveClick("name")}>Save</Button>
              </>
            ) : (
              <Button onClick={() => handleEditClick("name")}>Edit</Button>
            )}
          </AccordionActions>
        </AccordionDetails>
      </Accordion>

      {/* Address Section */}
      <Accordion className={styles.profileSection}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="address-panel"
        >
          Address
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.profileField}>
            <label>Street:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.street}
            />
          </div>
          <div className={styles.profileField}>
            <label>City:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.city}
            />
          </div>
          <div className={styles.profileField}>
            <label>State:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.state}
            />
          </div>
          <div className={styles.profileField}>
            <label>Zip:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.zip}
            />
          </div>
          <AccordionActions>
            {isEditingAddress ? (
              <>
                <Button
                  onClick={() => handleCancelClick("address")}
                  color="error"
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveClick("address")}>Save</Button>
              </>
            ) : (
              <Button onClick={() => handleEditClick("address")}>Edit</Button>
            )}
          </AccordionActions>
        </AccordionDetails>
      </Accordion>

      {/* Contact Info Section */}
      <Accordion className={styles.profileSection}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-panel"
        >
          Contact Info
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.profileField}>
            <label>Cell Phone Number:</label>
            <TextField
              type="text"
              disabled={!isEditingContact}
              defaultValue={profileData.cellPhoneNumber}
            />
          </div>
          <div className={styles.profileField}>
            <label>Work Phone Number:</label>
            <TextField
              type="text"
              disabled={!isEditingContact}
              defaultValue={profileData.workPhoneNumber}
            />
          </div>
          <AccordionActions>
            {isEditingContact ? (
              <>
                <Button
                  onClick={() => handleCancelClick("contact")}
                  color="error"
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveClick("contact")}>Save</Button>
              </>
            ) : (
              <Button onClick={() => handleEditClick("contact")}>Edit</Button>
            )}
          </AccordionActions>
        </AccordionDetails>
      </Accordion>

      {/* Employment Section */}
      <Accordion className={styles.profileSection}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="employment-panel"
        >
          Employment
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.profileField}>
            <label>Visa Status:</label>
            <TextField
              type="text"
              disabled={!isEditingEmployment}
              defaultValue={profileData.citizenship?.visaStatus}
            />
          </div>
          <div className={styles.profileField}>
            <label>Start Date:</label>
            <TextField
              type="date"
              disabled={!isEditingEmployment}
              defaultValue={
                new Date(profileData.citizenship?.startDate)
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>End Date:</label>
            <TextField
              type="date"
              disabled={!isEditingEmployment}
              defaultValue={
                new Date(profileData.citizenship.endDate)
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>
          <AccordionActions>
            {isEditingEmployment ? (
              <>
                <Button
                  onClick={() => handleCancelClick("employment")}
                  color="error"
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveClick("employment")}>
                  Save
                </Button>
              </>
            ) : (
              <Button onClick={() => handleEditClick("employment")}>
                Edit
              </Button>
            )}
          </AccordionActions>
        </AccordionDetails>
      </Accordion>

      {/* Emergency Contact Section */}
      <Accordion className={styles.profileSection}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="emergency-panel"
        >
          Emergency Contact
        </AccordionSummary>
        <AccordionDetails>
          {profileData.emergencyContacts?.map((contact, index) => (
            <Emergency
              key={index}
              contact={contact}
              isEditing={isEditingEmergency}
              onEdit={() => handleEditEmergencyContact(index)}
              onSave={handleSaveEmergencyContact}
              onCancel={handleCancelEmergencyContact}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Documents Section */}
      <Accordion className={styles.profileSection}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="document-panel"
        >
          Documents
        </AccordionSummary>
        <AccordionDetails>
          {/* Driver's License */}
          <div className={styles.profileField}>
            <label>Driver&apos;s License:</label>
            {profileData.driverLicense?.licenseCopy ? (
              <>
                <Button
                  onClick={() =>
                    window.open(
                      `/${profileData.driverLicense?.licenseCopy}`,
                      "_blank"
                    )
                  }
                >
                  Preview
                </Button>
                <a
                  href={`/${profileData.driverLicense?.licenseCopy}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </>
            ) : (
              <span>No document available</span>
            )}
          </div>

          {/* Other Documents */}
          {Object.entries(profileData.citizenship?.optDocument)
            .filter(
              ([key]) => key !== "_id" && key !== "userid" && key !== "__v"
            ) // 过滤掉不需要的字段
            .map(([key, doc]) => (
              <div className={styles.profileField} key={key}>
                <label>{key.replace(/([A-Z])/g, " $1")}:</label>
                {doc.name ? (
                  <>
                    <Button
                      onClick={() => window.open(`/${doc.name}`, "_blank")}
                    >
                      Preview
                    </Button>
                    <a
                      href={`/${doc.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </>
                ) : (
                  <span>No document available</span>
                )}
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
