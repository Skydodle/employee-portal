import React from 'react';
import PropTypes from 'prop-types';
import EmergencyContact from '../EmergencyContact';
import { useDispatch, useSelector } from 'react-redux';
import { selectReference } from '../../store/onBoardingSlice/onBoarding.selectors';
import { updateReference } from '../../store/onBoardingSlice/onBoarding.slice';

function Reference({ disabled = false }) {
  const reference = useSelector(selectReference);
  const dispatch = useDispatch();
  return (
    <>
      <EmergencyContact
        emergencyContact={reference}
        disabled={disabled}
        onChange={(e) => {
          dispatch(updateReference({ [e.target.name]: e.target.value }));
        }}
      />
    </>
  );
}

Reference.propTypes = { disabled: PropTypes.bool };

export default Reference;
