import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OverviewStats from "@/components/dashboard/OverviewStats";
import OverviewSection from "@/components/dashboard/OverviewSection";
import CaregiverAvailability from "@/components/caregivers/CaregiverAvailability";
import AvailabilitySection from "@/components/availability/AvailabilitySection";
import CaregiverAvailable from "@/components/caregivers/CaregiverAvailable";
import AvailableSection from "@/components/availability/AvailableSection";

export default function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const renderRoleBasedFeatures = () => {
    if (role === "caregiver") {
      return (
        <>
          <OverviewStats role={role} />
          <OverviewSection role={role} />
        </>
      );
    }

    if (role === "user") {
      return (
        <>
          <OverviewStats role={role} />
          <OverviewSection role={role} />
        </>
      );
    }

    return null;
  };

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span>Beranda</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderRoleBasedFeatures()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
