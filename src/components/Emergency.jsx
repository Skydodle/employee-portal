import React, { useState } from 'react';

function Emergency({ contact, isEditing, onEdit, onSave, onCancel, inputStyle }) {
  const [localContact, setLocalContact] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalContact((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="emergency-contact">
      <div className="profile-field">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          disabled={!isEditing}
          value={localContact.firstName}
          onChange={handleChange}
          style={inputStyle(isEditing)}
        />
      </div>
      <div className="profile-field">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          disabled={!isEditing}
          value={localContact.lastName}
          onChange={handleChange}
          style={inputStyle(isEditing)}
        />
      </div>
      <div className="profile-field">
        <label>Phone:</label>
        <input
          type="text"
          name="phoneNumber"
          disabled={!isEditing}
          value={localContact.phoneNumber}
          onChange={handleChange}
          style={inputStyle(isEditing)}
        />
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <input
          type="email"
          name="emailAddress"
          disabled={!isEditing}
          value={localContact.emailAddress}
          onChange={handleChange}
          style={inputStyle(isEditing)}
        />
      </div>
      <div className="profile-field">
        <label>Relationship:</label>
        <input
          type="text"
          name="relationship"
          disabled={!isEditing}
          value={localContact.relationship}
          onChange={handleChange}
          style={inputStyle(isEditing)}
        />
      </div>
      {isEditing ? (
        <>
          <button onClick={() => onSave(localContact)}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={onEdit}>Edit</button>
      )}
    </div>
  );
}

export default Emergency;
