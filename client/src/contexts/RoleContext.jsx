import { createContext, useContext, useEffect, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tempRegisterData"));
    if (data?.role) setRole(data.role);
  }, []);

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
