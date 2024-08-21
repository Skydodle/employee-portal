/** @format */

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true // allow attached of cookies
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if the current page is not the login page before redirecting
      if (window.location.pathname !== '/login') {
        // Handle unauthorized errors (e.g., redirect to login)
        // You could also remove the token from localStorage if it's invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
