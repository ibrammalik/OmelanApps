import { useSidebar } from "../ui/sidebar";
import brandImage from "../../assets/images/profile.png";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className={`flex items-center transition-all duration-300 ${
        collapsed ? "justify-center py-1" : "justify-start px-4 py-1"
      }`}
    >
      <div className="flex items-center gap-3 font-bold text-lg tracking-wide text-gray-800">
        <img
          src={brandImage}
          alt="OMELAN Logo"
          className="size-8 rounded-full object-cover"
        />
        <span
          className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
            collapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
          }`}
        >
          OMELAN
        </span>
      </div>
    </div>
  );
}
