import { Button, Typography } from "@mui/material";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  Onboarding,
  Profile,
  VisaStatus,
  Housing,
  Report,
} from "./pages";
import Guard from "./components/Guard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Guard />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/visa-status" element={<VisaStatus />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/housing/report" element={<Report />} />
        </Route>
      </Routes>
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Material UI Vite.js example
      </Typography>
      <Button color="primary">primary</Button>
      <Button color="secondary">secondary</Button>
      <Button color="error">error</Button>
    </BrowserRouter>
  );
}

export default App;
