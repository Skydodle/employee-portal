/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { selectIsRegistered, registerUser } from '../store';
import RegisterForm from '../components/RegisterForm';
import { Typography, Box } from '@mui/material';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRegistered = useSelector(selectIsRegistered);
  const { registToken } = useOutletContext(); // Get the registToken from Outlet context

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username || !email || !password) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser({ registToken, username, email, password }))
        .unwrap()
        .then(() => navigate('/login'))
        .catch((error) => setError(error));
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      px={2}
    >
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
      >
        Register
      </Typography>
      <Box
        width='100%'
        maxWidth='400px'
        mx='auto'
      >
        <RegisterForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleRegister}
          error={error}
        />
      </Box>
      {isRegistered && (
        <Typography variant='body1'>
          Registration successful! Please login.
        </Typography>
      )}
    </Box>
  );
};

export default Register;
