import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProviderCustom = ({ children }) => {
  const [activeLabel, setActiveLabel] = useState("Beranda");
  return (
    <SidebarContext.Provider value={{ activeLabel, setActiveLabel }}>
      {children}
    </SidebarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarLabel = () => useContext(SidebarContext);
