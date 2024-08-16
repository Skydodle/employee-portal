// src/theme.js
import { createTheme } from '@mui/material/styles';
import {red} from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
    background: {
      default: '#f4f6f8', // Background color for the entire app
    },
    error:{
        main: red.A400,
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none', // Prevents buttons from being all-uppercase by default
    },
  },
  spacing: 8, // This sets the base spacing unit (1 unit = 8px)
});

export default theme;
