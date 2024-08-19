/** @format */

import { Outlet } from 'react-router-dom';

const LoginGuard = () => {
  const isLoggedIn = true;

  // // conditional rendering
  return isLoggedIn ? <Outlet /> : <h1>You are not logged in</h1>;
};

export default LoginGuard;
