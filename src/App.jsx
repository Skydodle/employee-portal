import { Button, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Material UI Vite.js example
      </Typography>
      <Button color="primary">primary</Button>
      <Button color="secondary">secondary</Button>
      <Button color="error">error</Button>
    </>
  );
}

export default App;
