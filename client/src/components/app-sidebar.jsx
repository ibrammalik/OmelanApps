import React, { useEffect } from "react";
import {
  CalendarCheck2,
  CalendarClock,
  Heart,
  LayoutDashboard,
  List,
  NotebookPen,
  SquareCheck,
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
import ROUTES from "@/routes/route";

export function AppSidebar({ setActiveLabel }) {
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    // Simpan dummy user ke localStorage hanya jika belum ada
    if (!localStorage.getItem("tempRegisterData")) {
      const dummyUser = {
        name: "Data Dummy",
        email: "Dummy@example.com",
        role: "caregiver", // atau "caretaker"
      };
      localStorage.setItem("tempRegisterData", JSON.stringify(dummyUser));
    }
  }, []);

  const clientMenu = [
    {
      icon: <LayoutDashboard size={16} />,
      label: "Beranda",
      url: ROUTES.caretaker.dashboard,
    },
    {
      icon: <List size={16} />,
      label: "Permintaan",
      url: ROUTES.caretaker.order,
    },
    {
      icon: <CalendarCheck2 size={16} />,
      label: "Janji Temu",
      url: ROUTES.caretaker.appointment,
    },
    {
      icon: <NotebookPen size={16} />,

      label: "Penilaian & Ulasan",
      url: ROUTES.caretaker.review,
    },
    // {
    //   icon: <Heart size={16} />,
    //   label: "Disukai",
    //   url: ROUTES.caretaker.favorite,
    // },
  ];

  const caregiverMenu = [
    {
      icon: <LayoutDashboard size={16} />,
      label: "Beranda",
      url: ROUTES.caregiver.dashboard,
    },
    // {
    //   icon: <SquareCheck size={16} />,
    //   label: 'Konfirmasi Permintaan',
    //   url: ROUTES.caregiver.requests,
    // },
    {
      icon: <CalendarCheck2 size={16} />,
      label: "Janji Temu",
      url: ROUTES.caregiver.appointment,
    },
    {
      icon: <CalendarClock size={16} />,
      label: "Jadwal Ketersediaan",
      url: ROUTES.caregiver.availability,
    },
    // {
    //   icon: <Wallet size={16} />,
    //   label: "Pendapatan",
    //   url: ROUTES.caregiver.earnings,
    // },
    {
      icon: <NotebookPen size={16} />,
      label: "Penilaian",
      url: ROUTES.caregiver.reviews,
    },
  ];

  const menuItems = role === "caregiver" ? caregiverMenu : clientMenu;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuContent items={menuItems} onSelect={setActiveLabel} />
      </SidebarContent>
      <SidebarFooter>
        <NavProfile setActiveLabel={setActiveLabel} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
