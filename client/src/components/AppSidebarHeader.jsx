import { useSidebar } from "./ui/sidebar";
import brandImage from "../assets/images/profile.png";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center px-2 py-3" : "justify-start px-4 py-3"
      }`}
    >
      <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
        <img
          src={brandImage}
          alt="OMELAN Logo"
          className="w-9 h-9 rounded-full object-cover"
        />
        {!collapsed && <span>OMELAN</span>}
      </div>
    </div>
  );
}
