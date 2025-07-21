import React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  CalendarCheck2,
  CalendarClock,
  Command,
  Frame,
  GalleryVerticalEnd,
  House,
  LayoutDashboard,
  List,
  Map,
  NotebookPen,
  PieChart,
  Settings2,
  SquareTerminal,
  Star,
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
      label: "Dashboard",
      url: "/dashboard",
    },
  ];

  const userMenu = [
    { icon: <List size={16} />, label: "Requests", url: "/requests" },
    {
      icon: <CalendarCheck2 size={16} />,
      label: "Appointments",
      url: "/appointments",
    },
    { icon: <NotebookPen size={16} />, label: "Reviews", url: "/reviews" },
    { icon: <Star size={16} />, label: "Favorite", url: "/favorite" },
  ];

  const caregiverMenu = [
    {
      icon: <CalendarCheck2 size={16} />,
      label: "Appointments",
      url: "/appointments",
    },
    {
      icon: <CalendarClock size={16} />,
      label: "Availability Schedule",
      url: "/availability",
    },
    { icon: <Wallet size={16} />, label: "Earnings", url: "/earnings" },
    { icon: <Star size={16} />, label: "Reviews", url: "/reviews" },
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
