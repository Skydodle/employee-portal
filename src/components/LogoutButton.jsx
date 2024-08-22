/** @format */

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../store';
import PropTypes from 'prop-types';

const LogoutButton = ({ sx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and onboardingRedirected from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('onboardingRedirected');

    // Dispatch the logout action
    dispatch(logout());

    // Redirect to login page
    navigate('/login');
  };

  return (
    <Button variant='text' color='secondary' sx={sx} onClick={handleLogout}>
      Log Out
    </Button>
  );
};

LogoutButton.propTypes = {
  sx: PropTypes.object
};

export default LogoutButton;
