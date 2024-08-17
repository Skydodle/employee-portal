/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store';
import { selectIsAuthenticated } from '../../store';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, email }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {isAuthenticated && <p>Welcome, you are logged in!</p>}
    </div>
  );
};

export default Login;
