/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store';
import { selectIsAuthenticated } from '../../store';
import LoginForm from './LoginForm';
import { Typography, Box } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser({ username, password }))
        .unwrap()
        .catch((error) => setError(error));
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh' // This makes the Box take the full height of the viewport
      px={2} // Padding on the x-axis to prevent the form from touching the screen edges on small devices
    >
      <Typography
        variant='h4'
        component='h4'
        gutterBottom
      >
        Login
      </Typography>
      <Box
        width='100%'
        maxWidth='400px' // Set a specific width for the form
        mx='auto'
      >
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleLogin}
          error={error}
        />
      </Box>
      {isAuthenticated && (
        <Typography variant='body1'>Welcome, you are logged in!</Typography>
      )}
    </Box>
  );
};

export default Login;
