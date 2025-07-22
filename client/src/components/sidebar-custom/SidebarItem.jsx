import { Link } from "react-router-dom";

export function SidebarItem({ icon, label, url, collapsed }) {
  return (
    <Link
      to={url}
      className={`
        flex items-center gap-3 rounded-md p-2 text-sm font-semibold text-gray-800 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-200 focus:text-blue-800 transition-colors duration-200 
        ${collapsed ? "justify-center px-2" : "justify-start"}
      `}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span
        className={`
          overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
          ${collapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
