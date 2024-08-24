import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import DatePicker from '../DatePicker';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../store/onBoardingSlice/onBoarding.slice';
import RadioGroup from '../RadioGroup';

const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'I do not wish to answer', value: 'I do not wish to answer' }
];

function PersonalDetails({ disabled = false }) {
  const profile = useSelector((state) => state.onboarding.profile);
  const dispatch = useDispatch();

  return (
    <>
      <TextField
        name='firstName'
        id='firstName'
        label='First Name'
        disabled={disabled}
        inputProps={{ pattern: '[A-Za-z ]+' }}
        required
      />
      <TextField
        id='middleName'
        name='middleName'
        inputProps={{ pattern: '[A-Za-z .]+' }} // Updated pattern
        label='Middle Name'
        disabled={disabled}
      />
      <TextField
        id='lastName'
        name='lastName'
        label='Last Name'
        inputProps={{ pattern: '[A-Za-z ]+' }}
        disabled={disabled}
        required
      />
      <TextField
        id='preferredName'
        name='preferredName'
        inputProps={{ pattern: '[A-Za-z ]+' }}
        label='Preferred Name'
        disabled={disabled}
      />
      <DatePicker
        value={dayjs(profile.dateOfBirth)}
<<<<<<< HEAD
        name="dateOfBirth"
=======
        name='dateOfBirth'
>>>>>>> main
        onChange={(value) => {
          dispatch(update({ dateOfBirth: value.format('MM/DD/YYYY') }));
        }}
        id='dateOfBirth'
        disabled={disabled}
        label='Date of Birth *'
        required
      />
      <RadioGroup
        name='gender'
        id='gender'
        label='Gender'
        options={options}
        disabled={disabled}
      />
      <TextField
        id='ssn'
        name='ssn'
        label='SSN'
        disabled={disabled}
        inputProps={{ pattern: '[0-9\\-]+' }} // Updated pattern
        required
      />
    </>
  );
}

PersonalDetails.propTypes = { disabled: PropTypes.bool };

export default PersonalDetails;
