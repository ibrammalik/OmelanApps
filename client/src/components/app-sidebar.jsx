import * as React from "react";
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
  List,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarMenuContent from "./SidebarMenuContent";
import AppSidebarHeader from "./AppSidebarHeader";
// import { link } from "fs";

const commonNav = [
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Introduction", url: "#" },
      { title: "Get Started", url: "#" },
      { title: "Tutorials", url: "#" },
      { title: "Changelog", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

const caregiverNav = [
  {
    title: "Caregiver",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
];

const caretakerNav = [
  {
    title: "Caretaker",
    url: "#",
    icon: Bot,
    items: [
      { title: "Genesis", url: "#" },
      { title: "Explorer", url: "#" },
      { title: "Quantum", url: "#" },
    ],
  },
];
// This is sample data.
const udata = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Caregiver",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Order-List",
          url: "#",
        },
        {
          title: "My Appointment",
          url: "#",
        },
        {
          title: "My Availability",
          url: "#",
        },
      ],
    },
    {
      title: "Caretaker",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ role, ...props }) {
  let navMain = [];

  if (role === "caregiver") {
    navMain = [...caregiverNav, ...commonNav];
  } else if (role === "caretaker") {
    navMain = [...caretakerNav, ...commonNav];
  } else {
    navMain = [...commonNav];
  }

  const userMenu = [
    { icon: <House size={16} />, label: "Dashboard" },
    { icon: <List size={16} />, label: "My Requests" },
    { icon: <CalendarCheck2 size={16} />, label: "My Appointments" },
  ];

  const caregiverMenu = [
    { icon: <House size={16} />, label: "Dashboard" },
    { icon: <List size={16} />, label: "Requests" },
    { icon: <CalendarCheck2 size={16} />, label: "My Appointments" },
    { icon: <CalendarClock size={16} />, label: "My Availability" },
  ];

  const menuItems = role === "caregiver" ? caregiverMenu : userMenu;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <Sidebar> */}
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuContent items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
