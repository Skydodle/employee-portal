/** @format */

import PropTypes from 'prop-types';
import { TextField, Button, Typography, Box } from '@mui/material';

const RegisterForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error
}) => {
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {error && (
        <Typography
          variant='body1'
          color='error'
        >
          {error}
        </Typography>
      )}
      <TextField
        label='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        inputProps={{
          minLength: 3,
          maxLength: 15,
          pattern: '^[a-zA-Z0-9]+$'
        }}
      />
      <TextField
        label='Email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        inputProps={{
          maxLength: 50
        }}
      />
      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        inputProps={{
          minLength: 8, // Minimum length for the password
          pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$', // Enforces a strong password pattern
          title:
            'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.'
        }}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Box>
  );
};

// Define PropTypes
RegisterForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default RegisterForm;
