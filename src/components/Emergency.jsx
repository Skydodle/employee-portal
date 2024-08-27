import React, { useState, useEffect } from 'react';

function Emergency({ contact, isEditing, onEdit, onSave, onCancel, inputStyle }) {
  const [localContact, setLocalContact] = useState(contact);
  const [initialContact, setInitialContact] = useState(contact);

  useEffect(() => {
    setLocalContact(contact);
    setInitialContact(contact);
  }, [contact]);

  useEffect(() => {
    if (!isEditing) {
      setLocalContact(initialContact); // 如果退出编辑模式，重置本地状态
    }
  }, [isEditing, initialContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Do you want to discard all of your changes?');
    if (confirmCancel) {
      setLocalContact(initialContact);
      onCancel();
    }
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
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={() => onSave(localContact)}>Save</button>
        </>
      ) : (
        <button onClick={onEdit}>Edit</button>
      )}
    </div>
  );
}

export default Emergency;