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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/employee/info');
        setProfileData(response.data);
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
  };

  const handleCancelClick = (section) => {
    const confirmCancel = window.confirm('Do you want to discard all of your changes?');
    if (confirmCancel) {
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
      // Logic to undo changes can be added here
    }
  };

  const handleSaveClick = async (section) => {
    try {
      let dataToUpdate = {};
      switch (section) {
        case 'address':
          dataToUpdate = {
            address: {
              street: profileData.address.street,
              city: profileData.address.city,
              state: profileData.address.state,
              zip: profileData.address.zip
            }
          };
          setIsEditingAddress(false);
          break;
        case 'contact':
          dataToUpdate = {
            cellPhoneNumber: profileData.cellPhoneNumber,
            workPhoneNumber: profileData.workPhoneNumber
          };
          setIsEditingContact(false);
          break;
        case 'employment':
          dataToUpdate = {
            citizenship: {
              visaStatus: profileData.citizenship.visaStatus,
              startDate: profileData.citizenship.startDate,
              endDate: profileData.citizenship.endDate
            }
          };
          setIsEditingEmployment(false);
          break;
        case 'emergency':
          dataToUpdate = {
            emergencyContacts: profileData.emergencyContacts
          };
          setIsEditingEmergency(false);
          break;
        default:
          break;
      }

      const response = await axiosInstance.put('/employee/info', dataToUpdate);
      setProfileData(response.data); 
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setError('Failed to update profile');
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

  const profilePageStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'left'
  };


  const inputStyle = (isEditing) => ({
    border: isEditing ? '1px solid #ccc' : 'none',
    backgroundColor: isEditing ? 'white' : 'transparent',
  });

  return (
    <div className="profile-page" style={profilePageStyle}>
      <h1>Personal Information</h1>

      {/* Name Section */}
      <section className="profile-section">
        <h2>Name</h2>
        <div className="profile-field">
          <label>First Name:</label>
          <input 
            type="text" 
            disabled={!isEditingName} 
            defaultValue={profileData.firstName} 
            style={inputStyle(isEditingName)} 
          />
        </div>
        <div className="profile-field">
          <label>Middle Name:</label>
          <input 
            type="text" 
            disabled={!isEditingName} 
            defaultValue={profileData.middleName} 
            style={inputStyle(isEditingName)} 
          />
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          <input 
            type="text" 
            disabled={!isEditingName} 
            defaultValue={profileData.lastName} 
            style={inputStyle(isEditingName)}
          />
        </div>
        <div className="profile-field">
          <label>Preferred Name:</label>
          <input 
            type="text" 
            disabled={!isEditingName} 
            defaultValue={profileData.preferredName} 
            style={inputStyle(isEditingName)} 
          />
        </div>
        <div className="profile-field">
          <label>Profile Picture:</label>          
          {!isEditingName && <img src={`/${profileData.profilePicture}`} alt="Profile" />}
          {isEditingName && <input type="file" />}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input 
            type="email" 
            disabled={!isEditingName} 
            defaultValue={profileData.userId.email} 
            style={inputStyle(isEditingName)} 
          />
        </div>
        <div className="profile-field">
          <label>SSN:</label>
          <input 
            type="text" 
            disabled={!isEditingName} 
            defaultValue={profileData.ssn} 
            style={inputStyle(isEditingName)}
          />
        </div>
        <div className="profile-field">
          <label>Date of Birth:</label>
          <input 
            type="date" 
            disabled={!isEditingName} 
            defaultValue={new Date(profileData.dateOfBirth).toISOString().split('T')[0]} 
            style={inputStyle(isEditingName)}
          />
        </div>
        <div className="profile-field">
          <label>Gender:</label>
          <select 
            disabled={!isEditingName} 
            defaultValue={profileData.gender}
            style={inputStyle(isEditingName)}
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
            defaultValue={profileData.address.street} 
            style={inputStyle(isEditingAddress)} 
          />
        </div>
        <div className="profile-field">
          <label>City:</label>
          <input 
            type="text" 
            disabled={!isEditingAddress} 
            defaultValue={profileData.address.city} 
            style={inputStyle(isEditingAddress)} 
          />
        </div>
        <div className="profile-field">
          <label>State:</label>
          <input 
            type="text" 
            disabled={!isEditingAddress} 
            defaultValue={profileData.address.state} 
            style={inputStyle(isEditingAddress)} 
          />
        </div>
        <div className="profile-field">
          <label>Zip:</label>
          <input 
            type="text" 
            disabled={!isEditingAddress} 
            defaultValue={profileData.address.zip} 
            style={inputStyle(isEditingAddress)} 
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
            defaultValue={profileData.cellPhoneNumber} 
            style={inputStyle(isEditingContact)} 
          />
        </div>
        <div className="profile-field">
          <label>Work Phone Number:</label>
          <input 
            type="text" 
            disabled={!isEditingContact} 
            defaultValue={profileData.workPhoneNumber} 
            style={inputStyle(isEditingContact)} 
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
          <input 
            type="text" 
            disabled={!isEditingEmployment} 
            defaultValue={profileData.citizenship.visaStatus} 
            style={inputStyle(isEditingEmployment)}
          />
        </div>
        <div className="profile-field">
          <label>Start Date:</label>
          <input 
            type="date" 
            disabled={!isEditingEmployment} 
            defaultValue={new Date(profileData.citizenship.startDate).toISOString().split('T')[0]} 
            style={inputStyle(isEditingEmployment)} 
          />
        </div>
        <div className="profile-field">
          <label>End Date:</label>
          <input 
            type="date" 
            disabled={!isEditingEmployment} 
            defaultValue={new Date(profileData.citizenship.endDate).toISOString().split('T')[0]} 
            style={inputStyle(isEditingEmployment)} 
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
            isEditing={isEditingEmergency}
            onEdit={() => handleEditEmergencyContact(index)}
            onSave={handleSaveEmergencyContact}
            onCancel={handleCancelEmergencyContact}
            inputStyle={inputStyle}
          />
        ))}
      </section>

      {/* Documents Section */}
      <section className="profile-section">
        <h2>Documents</h2>

        {/* Driver's License */}
        <div className="profile-field">
          <label>Driver's License:</label>
          {profileData.driverLicense.licenseCopy ? (
            <>
              <button onClick={() => window.open(`/${profileData.driverLicense.licenseCopy}`, '_blank')}>Preview</button>
              <a href={`/${profileData.driverLicense.licenseCopy}`} target="_blank" rel="noopener noreferrer">Download</a>
            </>
          ) : (
            <span>No document available</span>
          )}
        </div>

        {/* Other Documents */}
        {Object.entries(profileData.citizenship.optDocument)
          .filter(([key]) => key !== '_id' && key !== 'userid' && key !== '__v') // 过滤掉不需要的字段
          .map(([key, doc]) => (
            <div className="profile-field" key={key}>
              <label>{key.replace(/([A-Z])/g, ' $1')}:</label>
              {doc.name ? (
                <>
                  <button onClick={() => window.open(`/${doc.name}`, '_blank')}>Preview</button>
                  <a href={`/${doc.name}`} target="_blank" rel="noopener noreferrer">Download</a>                  
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
