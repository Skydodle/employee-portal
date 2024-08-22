import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOnboardingStatus,getUserProfile,postUserProfile,selectUserProfileLoading } from '../store';

const OnboardingTesting = () => {

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const loading = useSelector(selectUserProfileLoading);
  useEffect(() => {
    dispatch(getOnboardingStatus());
    // dispatch(getUserProfile());
    
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      firstName,
    };

    dispatch(postUserProfile(profileData))
      .unwrap()
      .then((response) => {
        console.log('Profile submitted successfully:', response);
      })
      .catch((error) => {
        console.error('Failed to submit profile:', error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit Profile'}
    </button>
  </form>
  );
};

export default OnboardingTesting;
