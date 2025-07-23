import React from "react";
import {
  CalendarCheck2,
  CalendarClock,
  Heart,
  LayoutDashboard,
  List,
  NotebookPen,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarMenuContent from "./sidebar-custom/SidebarMenuContent";
import AppSidebarHeader from "./sidebar-custom/AppSidebarHeader";
import NavProfile from "./sidebar-custom/NavProfile";

export function AppSidebar({ role }) {
  const baseMenu = [
    {
      icon: <LayoutDashboard size={16} />,
      label: "Beranda",
      url: "/dashboard",
    },
  ];

  const userMenu = [
    { icon: <List size={16} />, label: "Permintaan", url: "/requests" },
    {
      icon: <CalendarCheck2 size={16} />,
      label: "Janji Temu",
      url: "/appointments",
    },
    { icon: <NotebookPen size={16} />, label: "Penilaian", url: "/reviews" },
    { icon: <Heart size={16} />, label: "Disukai", url: "/favorite" },
  ];

  const caregiverMenu = [
    {
      icon: <CalendarCheck2 size={16} />,
      label: "Janji Temu",
      url: "/appointments",
    },
    {
      icon: <CalendarClock size={16} />,
      label: "Jadwal Ketersediaan",
      url: "/availability",
    },
    { icon: <Wallet size={16} />, label: "Pendapatan", url: "/earnings" },
    { icon: <NotebookPen size={16} />, label: "Penilaian", url: "/reviews" },
  ];

  const menuItems =
    role === "caregiver"
      ? [...baseMenu, ...caregiverMenu]
      : [...baseMenu, ...userMenu];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuContent items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
