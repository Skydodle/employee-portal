/** @format */

import { Button, Typography } from '@mui/material';
import './App.css';
import Login from './components/Login/Login';

function App() {
  return (
    <>
      <div>
        <Typography
          variant='h1'
          component='h1'
          sx={{ mb: 2 }}
        >
          Material UI Vite.js example
        </Typography>
        <Button color='primary'>primary</Button>
        <Button color='secondary'>secondary</Button>
        <Button color='error'>error</Button>
      </div>
      <div>
        <Login />
      </div>
    </>
  );
}

export default App;
