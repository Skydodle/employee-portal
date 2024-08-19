/** @format */

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenValidationStatus, validateToken } from '../store';

const RegistrationGuard = () => {
  const [loading, setLoading] = useState(true);
  const [registToken, setRegistToken] = useState(null); // Renamed to registToken
  const dispatch = useDispatch();
  const location = useLocation();
  const isRegisTokenValid = useSelector(selectTokenValidationStatus);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      setRegistToken(token); // Store the registToken
      dispatch(validateToken(token))
        .unwrap()
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isRegisTokenValid ? (
    <Outlet context={{ registToken }} />
  ) : (
    <h1>You are not authorized!</h1>
  );
};

export default RegistrationGuard;
