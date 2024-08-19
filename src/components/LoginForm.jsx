/** @format */

import { Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  error
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin='normal'
        />
      </div>
      <div>
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin='normal'
        />
      </div>
      {error && (
        <Typography
          variant='body2'
          sx={{ color: 'error.main' }}
        >
          {error}
        </Typography>
      )}
      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
      >
        Login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default LoginForm;
