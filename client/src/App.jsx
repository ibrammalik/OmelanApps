import "./App.css";
import Page from "./pages/dashboard/page";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import LandingPage from "./pages/landingpage/LandingPage";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* <Route element={<DashboardLayout />}></Route> */}
      <Route path="dashboard" element={<Page />} />
    </Routes>
  );
}

export default App;
