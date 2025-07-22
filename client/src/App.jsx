import './App.css';
import Page from './pages/dashboard/page';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import PublicLayout from './layouts/PublicLayout';
import CaregiverOrderPage from './pages/OrderPage';
import CaregiverDetailPage from './pages/CaregiverDetailPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import CaregiverListPage from './pages/CaregiverListPage';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/caregivers" element={<CaregiverListPage />} />
        <Route path="/caregivers/:id" element={<CaregiverDetailPage />} />

        <Route path="/pesan" element={<CaregiverOrderPage />} />
        <Route path="/pesan/konfirmasi" element={<OrderConfirmationPage />} />
      </Route>

      {/* <Route element={<DashboardLayout />}></Route> */}
      <Route path="/dashboard" element={<Page />} />
    </Routes>
  );
}

export default App;
