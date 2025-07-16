import { useSidebar } from "./ui/sidebar";
import brandImage from "../assets/images/profile.png";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center py-1" : "justify-start px-4 py-1"
      }`}
    >
      <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
        <img
          src={brandImage}
          alt="OMELAN Logo"
          className="size-8 rounded-full object-cover aspect-square"
        />
        {!collapsed && <span>OMELAN</span>}
      </div>
    </div>
  );
}
