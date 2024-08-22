/** @format */

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store';
const LoginGuard = () => {
  /** Hardcoded Guard that should be deleted later and
   * user the real guard below. Keeping this for easy
   * developing phase for now
   */
  // const isLoggedIn = true;

  // // // conditional rendering
  // return isLoggedIn ? <Outlet /> : <h1>You are not logged in</h1>;

  /** Actual Guard that checks token or is logged in
   * Uncomment this section when done developing
   */

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = localStorage.getItem('token');

  // Check if the user is authenticated or if a token exists in localStorage
  return isAuthenticated || token ? <Outlet /> : <Navigate to='/login' />;
};

export default LoginGuard;
