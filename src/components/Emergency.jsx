import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../pages/Profile.module.css";

function Emergency({ contact, isEditing, onEdit, onSave, onCancel }) {
  const [localContact, setLocalContact] = useState(contact);
  const [initialContact, setInitialContact] = useState(contact);

  useEffect(() => {
    setLocalContact(contact);
    setInitialContact(contact);
  }, [contact]);

  useEffect(() => {
    if (!isEditing) {
      setLocalContact(initialContact);
    }
  }, [isEditing, initialContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Do you want to discard all of your changes?"
    );
    if (confirmCancel) {
      setLocalContact(initialContact);
      onCancel();
    }
  };

  return (
    <Card className="emergency-contact">
      <CardContent>
        <div className={styles.profileField}>
          <label>First Name:</label>
          <TextField
            type="text"
            name="firstName"
            disabled={!isEditing}
            value={localContact.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.profileField}>
          <label>Last Name:</label>
          <TextField
            type="text"
            name="lastName"
            disabled={!isEditing}
            value={localContact.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.profileField}>
          <label>Phone:</label>
          <TextField
            type="text"
            name="phoneNumber"
            disabled={!isEditing}
            value={localContact.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.profileField}>
          <label>Email:</label>
          <TextField
            type="email"
            name="emailAddress"
            disabled={!isEditing}
            value={localContact.emailAddress}
            onChange={handleChange}
          />
        </div>
        <div className={styles.profileField}>
          <label>Relationship:</label>
          <TextField
            type="text"
            name="relationship"
            disabled={!isEditing}
            value={localContact.relationship}
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        {isEditing ? (
          <>
            <Button onClick={handleCancel} color="error">
              Cancel
            </Button>
            <Button onClick={() => onSave(localContact)}>Save</Button>
          </>
        ) : (
          <Button onClick={onEdit}>Edit</Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Emergency;
