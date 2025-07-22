import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppointmentPage from "@/components/users/AppointmentPage";
import UserAppointment from "@/components/users/UserAppointment";
import ProfileCard from "@/components/ProfileCard";
import OverviewStats from "@/components/dashboard/OverviewStats";
import OverviewSection from "@/components/dashboard/OverviewSection";
import ReviewSummary from "@/components/caregivers/ReviewSummary";

export default function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const renderRoleBasedFeatures = () => {
    const dashboardData = {
      appointments: 45,
      earnings: 1500,
    };

    const appointments = [
      {
        id: 1,
        caretakerName: "Bambang",
        schedule: "22 July 2025, 10:00 AM",
      },
      {
        id: 2,
        caretakerName: "john",
        schedule: "23 July 2025, 2:00 PM",
      },
    ];

    const availability = {
      monday: ["08:00 AM - 12:00 PM", "02:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 11:00 AM"],
      friday: [],
    };

    const reviews = [
      {
        id: 1,
        caretakerName: "Bambang",
        date: "22 July 2025",
        feedback: "Very helpful and professional service!",
      },
      {
        id: 2,
        caretakerName: "john",
        date: "23 July 2025",
        feedback: "Friendly caregiver, but arrived slightly late.",
      },
    ];

    if (role === "caregiver") {
      return (
        <>
          <OverviewStats role={role} data={dashboardData} />
          <OverviewSection
            appointments={appointments}
            availability={availability}
          />
          <ReviewSummary reviews={reviews} />
        </>
      );
    }

    if (role === "user") {
      return (
        <>
          <ProfileCard />
          <UserAppointment />
          <AppointmentPage />
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
            <span>Dashboard</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          {renderRoleBasedFeatures()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
