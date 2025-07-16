import { useSidebar } from "./ui/sidebar";
import brandImage from "../assets/images/profile.png";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className={`flex items-center transition-all duration-300 ${
        collapsed ? "justify-center py-1" : "justify-start px-4 py-1"
      }`}
    >
      <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
        <img
          src={brandImage}
          alt="OMELAN Logo"
          className="size-8 rounded-full object-cover aspect-square"
        />
        {/* {!collapsed && (
          <span className="transition-all duration-300">OMELAN</span>
        )} */}
        <span
          className={`transition-all duration-300 ease-in-out overflow-hidden inline-block ${
            collapsed
              ? "w-0 opacity-0 scale-95"
              : "w-auto opacity-100 scale-100"
          }`}
        >
          OMELAN
        </span>
      </div>
    </div>
  );
}
