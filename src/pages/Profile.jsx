import React, { useState, useEffect } from "react";
import axiosInstance from "../interceptors/axiosInstance";
import Emergency from "../components/Emergency";
import UploadAvatar from "../components/UploadAvatar";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  AccordionActions,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./Profile.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getProfilePictureUrl } from "../store";
import { useDispatch } from "react-redux";

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

export default function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingEmployment, setIsEditingEmployment] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/employee/info");

      setProfileData(response.data);
      dispatch(getProfilePictureUrl(response.data.profilePicture));
      setEmail(response.data.userId.email);
      setLoading(false);
      setIsEditingEmergency(
        new Array(response.data.emergencyContacts.length).fill(false)
      );
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Upload file for driver's license
  const handleLicenseUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.put(
        "/employee/info/license",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Fetch updated data after successful upload
      fetchProfileData();
      alert("Driver's License updated successfully");
    } catch (error) {
      console.error("Error uploading license:", error.message);
      setError("Failed to upload license");
    }
  };

  // Upload file for other documents
  const handleDocumentUpload = async (file, docType) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", docType);

    try {
      const response = await axiosInstance.put(
        "/employee/info/visa",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Fetch updated data after successful upload
      fetchProfileData();
      alert("Document updated successfully");
    } catch (error) {
      console.error("Error uploading document:", error.message);
      setError("Failed to upload document");
    }
  };

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (docType === "license") {
      handleLicenseUpload(file);
    } else {
      handleDocumentUpload(file, docType);
    }
  };

  const handlePreviewClick = async (documentName) => {
    try {
      const response = await axiosInstance.put("/employee/info/url", {
        documentName,
      });
      const { url } = response.data;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching file URL:", error.message);
      setError("Failed to fetch file URL");
    }
  };
  const handleEditClick = (section) => {
    if (!isEditing) {
      setIsEditing(true);
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
    }
  };

  const handleCancelClick = (section) => {
    const confirmCancel = window.confirm(
      "Do you want to discard all of your changes?"
    );
    if (confirmCancel) {
      setIsEditing(false);
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
      fetchProfileData(); // Reset state by refetching data
    }
  };

  const handleSaveClick = async (section) => {
    try {
      if (section === "name") {
        let dataToUpdate = {
          firstName: profileData.firstName,
          middleName: profileData.middleName,
          lastName: profileData.lastName,
          preferredName: profileData.preferredName,
          ssn: profileData.ssn,
          dateOfBirth: profileData.dateOfBirth,
          gender: profileData.gender,
        };

        // Update general information
        await axiosInstance.put("/employee/info", dataToUpdate);

        // Update email separately
        await axiosInstance.put("/employee/info/email", { email });

        setIsEditingName(false);
      } else if (section === "address") {
        let dataToUpdate = {
          address: {
            street: profileData.address.street,
            city: profileData.address.city,
            state: profileData.address.state,
            zip: profileData.address.zip,
          },
        };
        await axiosInstance.put("/employee/info", dataToUpdate);
        setIsEditingAddress(false);
      } else if (section === "contact") {
        let dataToUpdate = {
          cellPhoneNumber: profileData.cellPhoneNumber,
          workPhoneNumber: profileData.workPhoneNumber,
        };
        await axiosInstance.put("/employee/info", dataToUpdate);
        setIsEditingContact(false);
      } else if (section === "employment") {
        let dataToUpdate = {
          citizenship: {
            visaStatus: profileData.citizenship.visaStatus,
            startDate: profileData.citizenship.startDate,
            endDate: profileData.citizenship.endDate,
          },
        };
        await axiosInstance.put("/employee/info", dataToUpdate);
        setIsEditingEmployment(false);
      } else if (section === "emergency") {
        let dataToUpdate = {
          emergencyContacts: profileData.emergencyContacts,
        };
        await axiosInstance.put("/employee/info", dataToUpdate);
        setIsEditingEmergency(false);
      }
      setIsEditing(false);
      fetchProfileData(); // Re-fetch data after saving
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setError("Failed to update profile");
    }
  };

  const handleChange = (section, field, value, index = null) => {
    const updatedData = { ...profileData };

    if (section === "emergency" && index !== null) {
      updatedData.emergencyContacts[index][field] = value;
    } else if (section === "address") {
      updatedData.address[field] = value;
    } else if (section === "contact") {
      updatedData[field] = value;
    } else if (section === "employment") {
      updatedData.citizenship[field] = value;
    } else if (section === "name") {
      updatedData[field] = value;
    }

    setProfileData(updatedData);
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
    if (!isEditing) {
      setIsEditing(true);
      const updatedEditingState = isEditingEmergency.map(
        (editState, i) => i === index
      );
      setIsEditingEmergency(updatedEditingState);
    }
  };

  const handleSaveEmergencyContact = async (updatedContact, index) => {
    try {
      const dataToUpdate = {
        emergencyContacts: [...profileData.emergencyContacts],
      };
      dataToUpdate.emergencyContacts[index] = updatedContact;

      const response = await axiosInstance.put("/employee/info", dataToUpdate);
      fetchProfileData();
      setIsEditing(false);
      setIsEditingEmergency(isEditingEmergency.map(() => false));
    } catch (error) {
      console.error("Error updating emergency contact:", error.message);
      setError("Failed to update emergency contact");
    }
  };

  const handleCancelEmergencyContact = () => {
    setIsEditing(false);
    const updatedEditingState = isEditingEmergency.map(() => false);
    setIsEditingEmergency(updatedEditingState);
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
              value={profileData.firstName}
              onChange={(e) =>
                handleChange("name", "firstName", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>Middle Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              value={profileData.middleName}
              onChange={(e) =>
                handleChange("name", "middleName", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>Last Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              value={profileData.lastName}
              onChange={(e) => handleChange("name", "lastName", e.target.value)}
            />
          </div>
          <div className={styles.profileField}>
            <label>Preferred Name:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              value={profileData.preferredName}
              onChange={(e) =>
                handleChange("name", "preferredName", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>Email:</label>
            <TextField
              type="email"
              disabled={!isEditingName}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.profileField}>
            <label>SSN:</label>
            <TextField
              type="text"
              disabled={!isEditingName}
              value={profileData.ssn}
              onChange={(e) => handleChange("name", "ssn", e.target.value)}
            />
          </div>
          <div className={styles.profileField}>
            <label>Date of Birth:</label>
            <TextField
              type="date"
              disabled={!isEditingName}
              value={
                new Date(profileData.dateOfBirth).toISOString().split("T")[0]
              }
              onChange={(e) =>
                handleChange("name", "dateOfBirth", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>Gender:</label>
            <Select
              disabled={!isEditingName}
              value={profileData.gender}
              onChange={(e) => handleChange("name", "gender", e.target.value)}
            >
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
              value={profileData.address.street}
              onChange={(e) =>
                handleChange("address", "street", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>City:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.city}
              value={profileData.address.zip}
              onChange={(e) => handleChange("address", "zip", e.target.value)}
            />
          </div>
          <div className={styles.profileField}>
            <label>State:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.state}
              value={profileData.address.state}
              onChange={(e) => handleChange("address", "state", e.target.value)}
            />
          </div>
          <div className={styles.profileField}>
            <label>Zip:</label>
            <TextField
              type="text"
              disabled={!isEditingAddress}
              defaultValue={profileData.address?.zip}
              value={profileData.address.zip}
              onChange={(e) => handleChange("address", "zip", e.target.value)}
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
              value={profileData.cellPhoneNumber}
              onChange={(e) =>
                handleChange("contact", "cellPhoneNumber", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>Work Phone Number:</label>
            <TextField
              type="text"
              disabled={!isEditingContact}
              defaultValue={profileData.workPhoneNumber}
              value={profileData.workPhoneNumber}
              onChange={(e) =>
                handleChange("contact", "workPhoneNumber", e.target.value)
              }
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
            <Select
              disabled={!isEditingEmployment}
              value={profileData.citizenship.visaStatus}
              onChange={(e) =>
                handleChange("employment", "visaStatus", e.target.value)
              }
            >
              <MenuItem value="H1-b">H1-B</MenuItem>
              <MenuItem value="L2">L2</MenuItem>
              <MenuItem value="F1">F1(CPT/OPT)</MenuItem>
              <MenuItem value="H4">H4</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="Green Card">Green Card</MenuItem>
              <MenuItem value="Citizen">Citizen</MenuItem>
            </Select>
          </div>
          <div className={styles.profileField}>
            <label>Start Date:</label>
            <TextField
              type="date"
              disabled={!isEditingEmployment}
              value={
                new Date(profileData.citizenship.startDate)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                handleChange("employment", "startDate", e.target.value)
              }
            />
          </div>
          <div className={styles.profileField}>
            <label>End Date:</label>
            <TextField
              type="date"
              disabled={!isEditingEmployment}
              value={
                new Date(profileData.citizenship.endDate)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                handleChange("employment", "endDate", e.target.value)
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
              isEditing={isEditingEmergency[index]}
              onEdit={() => handleEditEmergencyContact(index)}
              onSave={(updatedContact) =>
                handleSaveEmergencyContact(updatedContact, index)
              }
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
                    handlePreviewClick(profileData.driverLicense.licenseCopy)
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
          {profileData.citizenship?.optDocument &&
            Object.entries(profileData.citizenship?.optDocument)
              .filter(
                ([key]) => key !== "_id" && key !== "userid" && key !== "__v"
              )
              .map(([key, doc]) => (
                <div className={styles.profileField} key={key}>
                  <label>{key.replace(/([A-Z])/g, " $1")}:</label>
                  {doc.name ? (
                    <>
                      <Button onClick={() => handlePreviewClick(doc.name)}>
                        Preview
                      </Button>
                      {/* Show file input only if `doc.name` is not empty */}
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, key)}
                      />
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
