/** @format */

import { Button, Typography } from "@mui/material";
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
import LoginGuard from "./components/LoginGuard";
import RegisterGuard from "./components/RegisterGuard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterGuard />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<LoginGuard />}>
          <Route
            path='/onboarding'
            element={<Onboarding />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/visa-status'
            element={<VisaStatus />}
          />
          <Route
            path='/housing'
            element={<Housing />}
          />
          <Route
            path='/housing/report'
            element={<Report />}
          />
          <Route
          path='/testing'
          element={<OnboardingTesting />
        }
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
