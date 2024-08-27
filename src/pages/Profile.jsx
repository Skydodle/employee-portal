import React, { useState, useEffect } from 'react';
import axiosInstance from '../interceptors/axiosInstance';
import Emergency from '../components/Emergency';

export default function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingEmployment, setIsEditingEmployment] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get('/employee/info');
      setProfileData(response.data);
      setEmail(response.data.userId.email);
      setLoading(false);
      setIsEditingEmergency(new Array(response.data.emergencyContacts.length).fill(false));
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Upload file for driver's license
  const handleLicenseUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.put('/employee/info/license', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Fetch updated data after successful upload
      fetchProfileData();
      alert("Driver's License updated successfully");
    } catch (error) {
      console.error('Error uploading license:', error.message);
      setError('Failed to upload license');
    }
  };

  // Upload file for other documents
  const handleDocumentUpload = async (file, docType) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', docType);

    try {
      const response = await axiosInstance.put('/employee/info/visa', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Fetch updated data after successful upload
      fetchProfileData();
      alert('Document updated successfully');
    } catch (error) {
      console.error('Error uploading document:', error.message);
      setError('Failed to upload document');
    }
  };

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (docType === 'license') {
      handleLicenseUpload(file);
    } else {
      handleDocumentUpload(file, docType);
    }
  };

  const handlePreviewClick = async (documentName) => {
    try {
      const response = await axiosInstance.put('/employee/info/url', { documentName });
      const { url } = response.data;
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error fetching file URL:', error.message);
      setError('Failed to fetch file URL');
    }
  };

  const handleEditClick = (section) => {
    if (!isEditing) {
      setIsEditing(true);
      switch (section) {
        case 'name':
          setIsEditingName(true);
          break;
        case 'address':
          setIsEditingAddress(true);
          break;
        case 'contact':
          setIsEditingContact(true);
          break;
        case 'employment':
          setIsEditingEmployment(true);
          break;
        case 'emergency':
          setIsEditingEmergency(true);
          break;
        default:
          break;
      }
    }
  };

  const handleCancelClick = (section) => {
    const confirmCancel = window.confirm('Do you want to discard all of your changes?');
    if (confirmCancel) {
      setIsEditing(false);
      switch (section) {
        case 'name':
          setIsEditingName(false);
          break;
        case 'address':
          setIsEditingAddress(false);
          break;
        case 'contact':
          setIsEditingContact(false);
          break;
        case 'employment':
          setIsEditingEmployment(false);
          break;
        case 'emergency':
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
      if (section === 'name') {
        let dataToUpdate = {
          firstName: profileData.firstName,
          middleName: profileData.middleName,
          lastName: profileData.lastName,
          preferredName: profileData.preferredName,
          ssn: profileData.ssn,
          dateOfBirth: profileData.dateOfBirth,
          gender: profileData.gender
        };

        // Update general information
        await axiosInstance.put('/employee/info', dataToUpdate);

        // Update email separately
        await axiosInstance.put('/employee/info/email', { email });

        setIsEditingName(false);
      } else if (section === 'address') {
        let dataToUpdate = {
          address: {
            street: profileData.address.street,
            city: profileData.address.city,
            state: profileData.address.state,
            zip: profileData.address.zip
          }
        };
        await axiosInstance.put('/employee/info', dataToUpdate);
        setIsEditingAddress(false);
      } else if (section === 'contact') {
        let dataToUpdate = {
          cellPhoneNumber: profileData.cellPhoneNumber,
          workPhoneNumber: profileData.workPhoneNumber
        };
        await axiosInstance.put('/employee/info', dataToUpdate);
        setIsEditingContact(false);
      } else if (section === 'employment') {
        let dataToUpdate = {
          citizenship: {
            visaStatus: profileData.citizenship.visaStatus,
            startDate: profileData.citizenship.startDate,
            endDate: profileData.citizenship.endDate
          }
        };
        await axiosInstance.put('/employee/info', dataToUpdate);
        setIsEditingEmployment(false);
      } else if (section === 'emergency') {
        let dataToUpdate = {
          emergencyContacts: profileData.emergencyContacts
        };
        await axiosInstance.put('/employee/info', dataToUpdate);
        setIsEditingEmergency(false);
      }
      setIsEditing(false);
      fetchProfileData(); // Re-fetch data after saving
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setError('Failed to update profile');
    }
  };

  const handleChange = (section, field, value, index = null) => {
    const updatedData = { ...profileData };
  
    if (section === 'emergency' && index !== null) {
      updatedData.emergencyContacts[index][field] = value;
    } else if (section === 'address') {
      updatedData.address[field] = value;
    } else if (section === 'contact') {
      updatedData[field] = value;
    } else if (section === 'employment') {
      updatedData.citizenship[field] = value;
    } else if (section === 'name') { 
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
      const updatedEditingState = isEditingEmergency.map((editState, i) => i === index); 
      setIsEditingEmergency(updatedEditingState);
    }
  };

  const handleSaveEmergencyContact = async (updatedContact, index) => {
    try {
      const dataToUpdate = {
        emergencyContacts: [...profileData.emergencyContacts],
      };
      dataToUpdate.emergencyContacts[index] = updatedContact;
  
      const response = await axiosInstance.put('/employee/info', dataToUpdate);
      fetchProfileData()
      setIsEditing(false)
      setIsEditingEmergency(isEditingEmergency.map(() => false));
    } catch (error) {
      console.error('Error updating emergency contact:', error.message);
      setError('Failed to update emergency contact');
    }
  };

  const handleCancelEmergencyContact = () => {
    setIsEditing(false)
    const updatedEditingState = isEditingEmergency.map(() => false); 
    setIsEditingEmergency(updatedEditingState);
  };

  return (
    <div className="profile-page">
      <h1>Personal Information</h1>

      {/* Name Section */}
      <section className="profile-section">
        <h2>Name</h2>
        <div className="profile-field">
          <label>First Name:</label>
          <input
            type="text"
            disabled={!isEditingName}
            value={profileData.firstName} 
            onChange={(e) => handleChange('name', 'firstName', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Middle Name:</label>
          <input
            type="text"
            disabled={!isEditingName}
            value={profileData.middleName}
            onChange={(e) => handleChange('name', 'middleName', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          <input
            type="text"
            disabled={!isEditingName}
            value={profileData.lastName}
            onChange={(e) => handleChange('name', 'lastName', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Preferred Name:</label>
          <input
            type="text"
            disabled={!isEditingName}
            value={profileData.preferredName}
            onChange={(e) => handleChange('name', 'preferredName', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input
            type="email"
            disabled={!isEditingName}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>SSN:</label>
          <input
            type="text"
            disabled={!isEditingName}
            value={profileData.ssn}
            onChange={(e) => handleChange('name', 'ssn', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Date of Birth:</label>
          <input
            type="date"
            disabled={!isEditingName}
            value={new Date(profileData.dateOfBirth).toISOString().split('T')[0]}
            onChange={(e) => handleChange('name', 'dateOfBirth', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Gender:</label>
          <select
            disabled={!isEditingName}
            value={profileData.gender}
            onChange={(e) => handleChange('name', 'gender', e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {isEditingName ? (
          <>
            <button onClick={() => handleCancelClick('name')}>Cancel</button>
            <button onClick={() => handleSaveClick('name')}>Save</button>
          </>
        ) : (
          <button onClick={() => handleEditClick('name')}>Edit</button>
        )}
      </section>

      {/* Address Section */}
      <section className="profile-section">
        <h2>Address</h2>
        <div className="profile-field">
          <label>Street:</label>
          <input
            type="text"
            disabled={!isEditingAddress}
            value={profileData.address.street}
            onChange={(e) => handleChange('address', 'street', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>City:</label>
          <input
            type="text"
            disabled={!isEditingAddress}
            value={profileData.address.city}
            onChange={(e) => handleChange('address', 'city', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>State:</label>
          <input
            type="text"
            disabled={!isEditingAddress}
            value={profileData.address.state}
            onChange={(e) => handleChange('address', 'state', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Zip:</label>
          <input
            type="text"
            disabled={!isEditingAddress}
            value={profileData.address.zip}
            onChange={(e) => handleChange('address', 'zip', e.target.value)}
          />
        </div>
        {isEditingAddress ? (
          <>
            <button onClick={() => handleCancelClick('address')}>Cancel</button>
            <button onClick={() => handleSaveClick('address')}>Save</button>
          </>
        ) : (
          <button onClick={() => handleEditClick('address')}>Edit</button>
        )}
      </section>

      {/* Contact Info Section */}
      <section className="profile-section">
        <h2>Contact Info</h2>
        <div className="profile-field">
          <label>Cell Phone Number:</label>
          <input
            type="text"
            disabled={!isEditingContact}
            value={profileData.cellPhoneNumber}
            onChange={(e) => handleChange('contact', 'cellPhoneNumber', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Work Phone Number:</label>
          <input
            type="text"
            disabled={!isEditingContact}
            value={profileData.workPhoneNumber}
            onChange={(e) => handleChange('contact', 'workPhoneNumber', e.target.value)}
          />
        </div>
        {isEditingContact ? (
          <>
            <button onClick={() => handleCancelClick('contact')}>Cancel</button>
            <button onClick={() => handleSaveClick('contact')}>Save</button>
          </>
        ) : (
          <button onClick={() => handleEditClick('contact')}>Edit</button>
        )}
      </section>

      {/* Employment Section */}
      <section className="profile-section">
        <h2>Employment</h2>
        <div className="profile-field">
          <label>Visa Status:</label>
          <select
            disabled={!isEditingEmployment}
            value={profileData.citizenship.visaStatus}
            onChange={(e) => handleChange('employment', 'visaStatus', e.target.value)}
          >
            <option value="H1-b">H1-B</option>
            <option value="L2">L2</option>
            <option value="F1">F1(CPT/OPT)</option>
            <option value="H4">H4</option>
            <option value="other">Other</option>
            <option value="Green Card">Green Card</option>
            <option value="Citizen">Citizen</option>
          </select>
        </div>
        <div className="profile-field">
          <label>Start Date:</label>
          <input
            type="date"
            disabled={!isEditingEmployment}
            value={new Date(profileData.citizenship.startDate).toISOString().split('T')[0]}
            onChange={(e) => handleChange('employment', 'startDate', e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>End Date:</label>
          <input
            type="date"
            disabled={!isEditingEmployment}
            value={new Date(profileData.citizenship.endDate).toISOString().split('T')[0]}
            onChange={(e) => handleChange('employment', 'endDate', e.target.value)}
          />
        </div>
        {isEditingEmployment ? (
          <>
            <button onClick={() => handleCancelClick('employment')}>Cancel</button>
            <button onClick={() => handleSaveClick('employment')}>Save</button>
          </>
        ) : (
          <button onClick={() => handleEditClick('employment')}>Edit</button>
        )}
      </section>

      {/* Emergency Contact Section */}
      <section className="profile-section">
      <h2>Emergency Contact</h2>
      {profileData.emergencyContacts.map((contact, index) => (
        <Emergency
          key={index}
          contact={contact}
          isEditing={isEditingEmergency[index]}
          onEdit={() => handleEditEmergencyContact(index)}
          onSave={(updatedContact) => handleSaveEmergencyContact(updatedContact, index)}
          onCancel={handleCancelEmergencyContact}
        />
      ))}
    </section>

      {/* Documents Section */}
  <section className="profile-section">
      <h2>Documents</h2>

      {/* Driver's License */}
      <div className="profile-field">
        <label>Driver's License:</label>
        {profileData.driverLicense?.licenseCopy ? (
          <>
            <button onClick={() => handlePreviewClick(profileData.driverLicense.licenseCopy)}>Preview</button>
          </>
        ) : (
          <span>No document available</span>
        )}
        <input type="file" onChange={(e) => handleFileChange(e, 'license')} />
      </div>

      {/* Other Documents */}
      {profileData.citizenship?.optDocument &&
        Object.entries(profileData.citizenship.optDocument)
          .filter(([key]) => key !== '_id' && key !== 'userid' && key !== '__v')
          .map(([key, doc]) => (
            <div className="profile-field" key={key}>
              <label>{key.replace(/([A-Z])/g, ' $1')}:</label>
              {doc.name ? (
                <>
                  <button onClick={() => handlePreviewClick(doc.name)}>Preview</button>
                  {/* Show file input only if `doc.name` is not empty */}
                  <input type="file" onChange={(e) => handleFileChange(e, key)} />
                </>
              ) : (
                <span>No document available</span>
              )}
            </div>
          ))}
      </section>
    </div>
  );
}
