import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
("react-router-dom");

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [activeLabel, setActiveLabel] = useState("Beranda");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("accessToken");

    if (!userRole || !token) {
      window.location.href = "/login";
    } else {
      setRole(userRole); // role: "caregiver" / "caretaker"
    }
  }, []);

  // useEffect(() => {
  //   const userRole = localStorage.getItem("userRole");
  //   setRole(userRole);
  // }, []);

  if (role === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} setActiveLabel={setActiveLabel} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span>{activeLabel}</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
