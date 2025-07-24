import { Link, useLocation } from "react-router-dom";

export function SidebarItem({ icon, label, url, collapsed, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <Link
      to={url}
      onClick={onClick}
      className={`
        flex items-center gap-3 rounded-md p-2 text-sm font-semibold  transition-colors duration-200 
        ${collapsed ? "justify-center px-2" : "justify-start"}${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
      }
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
