import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { NavLink, useLocation } from "react-router-dom";

export function NavMenu() {
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  const navs = [
    { text: "Beranda", link: "/" },
    { text: "Pesan", link: "/pesan" },
  ];

  if (role === "caregiver") {
    navs.push({ text: "Dashboard", link: "/dashboard/caregiver" });
  } else if (role === "caretaker") {
    navs.push({ text: "Dashboard", link: "/dashboard/caretaker" });
  }

  useScrollToTop(location);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-6">
        {navs.map((nav, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
              <NavLink
                to={nav.link}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : ""
                }
              >
                {nav.text}
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
