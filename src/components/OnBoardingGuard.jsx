import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOnboardingStatus, selectOnboardingStatus } from '../store';

const OnboardingGuard = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectOnboardingStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      await dispatch(getOnboardingStatus());
      setIsLoading(false);
    };

    fetchStatus();
  }, [dispatch]);

  if (isLoading) {
    return null; // Show a loading spinner or some placeholder while fetching status
  }

  if (!status?.onboardingStatus) {
    return <Navigate to="/login" />; // Redirect to login if status is not available
  }

  // If status is 'Approved', allow access to all pages except /onboarding
  if (status.onboardingStatus === 'Approved' && window.location.pathname === '/onboarding') {
    return <Navigate to="/profile" />;
  }

  // Redirect to /onboarding if status is 'Not Started', 'Pending', or 'Rejected'
  if (status.onboardingStatus === 'Not Started' || status.onboardingStatus === 'Pending' || status.onboardingStatus === 'Rejected') {
    if (window.location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" />;
    }
    return <Outlet />; // Allow access to onboarding page
  }

  return <Outlet />;
};

export default OnboardingGuard;
