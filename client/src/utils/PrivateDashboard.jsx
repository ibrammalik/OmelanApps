import { Navigate, Outlet } from "react-router-dom";

export default function PrivateDashboard({
  allowedRole,
  redirectTo = "/login",
}) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  // Belum login atau token tidak ada
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Role tidak sesuai
  if (role !== allowedRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // Lolos
  return <Outlet />;
}
