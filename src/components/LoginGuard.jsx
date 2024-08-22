/** @format */

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../store';
import { useEffect } from 'react';

const LoginGuard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = localStorage.getItem('token');
  const location = useLocation();

  // State to track whether the user has been redirected to onboarding
  const onboardingRedirected = localStorage.getItem('onboardingRedirected');

  useEffect(() => {
    if ((isAuthenticated || token) && !onboardingRedirected) {
      localStorage.setItem('onboardingRedirected', 'true');
    }
  }, [isAuthenticated, token, onboardingRedirected]);

  if (!isAuthenticated && !token) {
    // If not authenticated, redirect to login
    return <Navigate to='/login' />;
  }

  if ((isAuthenticated || token) && !onboardingRedirected) {
    // Redirect to onboarding if not yet redirected
    return (
      <Navigate
        to='/onboarding'
        state={{ from: location }}
      />
    );
  }

  // If authenticated and already redirected to onboarding, allow access to other protected routes
  return <Outlet />;

  // Uncomment this section during development if needed to avoid login
  // const isLoggedIn = true;
  // return isLoggedIn ? <Outlet /> : <h1>You are not logged in</h1>;
};

export default LoginGuard;
