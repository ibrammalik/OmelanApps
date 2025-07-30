import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("userRole");

  if (!role || role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
