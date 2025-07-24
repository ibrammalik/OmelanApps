import { Separator } from "../ui/separator";
import { useSidebar } from "../ui/sidebar";
import { SidebarItem } from "./SidebarItem";

export default function SidebarMenuContent({ items, onSelect }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className={`space-y-4 transition-all duration-300 ease-in-out ${
        collapsed ? "px-2" : "px-3"
      }`}
    >
      <Separator className="mb-2" />
      <nav className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={collapsed ? null : item.label}
            url={item.url}
            onClick={() => onSelect?.(item.label)}
          />
        ))}
      </nav>
    </div>
  );
}
