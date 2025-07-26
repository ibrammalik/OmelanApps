import { Navigate, Outlet } from "react-router-dom";

export default function PrivateDashboard({ allowedRole }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to="/" />;

  return <Outlet />;
}
