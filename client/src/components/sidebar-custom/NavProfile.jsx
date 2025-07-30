import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ProfileImg from "../../assets/images/profile.png";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "@/routes/route";

export default function NavProfile({ setActiveLabel }) {
  const role = localStorage.getItem("userRole");
  const { isMobile } = useSidebar();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !role) return;

    const fetchUser = async () => {
      try {
        const endpoint =
          role === "caregiver" ? "/details/partner" : "/details/client";

        const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        if (res.ok) {
          setUser(result.data.details);
        } else {
          // console.error("Gagal memuat data user:", result.message);
        }
      } catch (err) {
        // console.error("Error mengambil user:", err);
      }
    };

    fetchUser();
  }, []);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("tempRegisterData");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileClick = () => {
    setActiveLabel("Profil");
    navigate(
      user?.role === "caregiver"
        ? ROUTES.caregiver.profile
        : ROUTES.caretaker.profile
    );
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className=":bg-sidebar-accent :text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.photo_url || ""} alt="profile" />
            <AvatarFallback>{user.fullname?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.fullname}</span>
            <span className="truncate font-small">
              {role === "caregiver" ? "Partner" : "Client"}
            </span>
            {/* <span className="truncate text-xs">{user.username}</span> */}
          </div>
          <DropdownMenu>
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenu>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem asChild className="p-0 font-normal">
          <div
            onClick={handleProfileClick}
            className="flex items-center gap-2 px-1 py-1.5 text-sm cursor-pointer"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.photo_url || ""} alt="Photo" />
              <AvatarFallback className="rounded-lg">
                {user.fullname?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.fullname}</span>
              {/* <span className="truncate text-xs">{user.email}</span> */}
              <span className="truncate text-xs">
                {role === "caregiver" ? "Partner" : "Client"}
              </span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
