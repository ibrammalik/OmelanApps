import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import PublicLayout from "./layouts/PublicLayout";
import CaregiverOrderPage from "./pages/OrderPage";
import CaregiverDetailPage from "./pages/CaregiverDetailPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CaregiverListPage from "./pages/CaregiverListPage";
import LoaderScreen from "./components/global/LoaderScreen";
import Dashboard from "./pages/Dashboard";
import ROUTES from "./routes/route";
import DashboardCaretaker from "./components/dashboard/DashboardCaretaker";
import DashboardCaregiver from "./components/dashboard/DashboardCaregiver";
import AvailableSection from "./components/availability/AvailableSection";
import ReviewList from "./components/caregivers/ReviewList";
import InvoiceSummary from "./components/caregivers/InvoiceSummary";
import ProfilePage from "./pages/ProfilePage";
import UserAppointment from "./components/users/UserAppointment";
import FavoriteCaregiver from "./components/users/FavoriteCaregiver";
import AppointmentSummary from "./components/users/AppointmentSummary";
import RequestSummary from "./components/users/RequestSummary";
import CaregiverConfirmRequest from "./pages/CaregiverConfirmRequest";
import CaregiverAppointment from "./components/caregivers/CaregiverAppointment";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateDashboard from "./utils/PrivateDashboard";
import { Toaster } from "./components/ui/sonner";
import ReviewSummary from "./components/caregivers/ReviewSummary";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/caregivers/:id" element={<CaregiverDetailPage />} />
          {/* <Route path="/caregivers" element={<CaregiverListPage />} /> */}
          <Route
            path="/konfirmasi-pesanan"
            element={
              <PrivateRoute allowedRole="caretaker">
                <OrderConfirmationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pesan"
            element={
              <PrivateRoute allowedRole="caretaker">
                <CaregiverOrderPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* <Route element={<DashboardLayout />}></Route> */}
        {/* caretaker */}
        <Route
          element={
            <PrivateDashboard
              allowedRole="caretaker"
              redirectTo="/dashboard/caregiver/"
            />
          }
        >
          <Route path={ROUTES.caretaker.dashboard} element={<Dashboard />}>
            <Route index element={<DashboardCaretaker />} />
            <Route path={ROUTES.caretaker.profile} element={<ProfilePage />} />
            <Route
              path={ROUTES.caretaker.appointment}
              element={<UserAppointment />}
            />
            <Route
              path={ROUTES.caretaker.order}
              element={<CaregiverAppointment />}
            />
            <Route
              path={ROUTES.caretaker.favorite}
              element={<FavoriteCaregiver />}
            />
            <Route
              path={ROUTES.caretaker.review}
              element={<AppointmentSummary />}
            />
          </Route>
        </Route>

        {/* caregiver */}
        <Route
          element={
            <PrivateDashboard allowedRole="caregiver" redirectTo="/pesan" />
          }
        >
          <Route path={ROUTES.caregiver.dashboard} element={<Dashboard />}>
            <Route index element={<DashboardCaregiver />} />
            <Route path={ROUTES.caregiver.profile} element={<ProfilePage />} />
            <Route
              path={ROUTES.caregiver.availability}
              element={<AvailableSection />}
            />
            {/* <Route
          path={ROUTES.caregiver.requests}
          element={<CaregiverConfirmRequest />}
        /> */}
            <Route
              path={ROUTES.caregiver.appointment}
              element={<CaregiverAppointment />}
            />
            <Route
              path={ROUTES.caregiver.earnings}
              element={<InvoiceSummary />}
            />
            <Route path={ROUTES.caregiver.reviews} element={<ReviewList />} />
          </Route>
        </Route>
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
