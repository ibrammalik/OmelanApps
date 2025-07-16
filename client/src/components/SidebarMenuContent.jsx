import { SidebarItem } from "./SidebarItem";
import { Separator } from "./ui/separator";
import { useSidebar } from "./ui/sidebar";

export default function SidebarMenuContent({ items }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className={`space-y-4 transition-all duration-300 ${
        collapsed ? "px-1" : "px-3"
      }`}
    >
      <Separator className="mb-2" />
      <nav className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={collapsed ? null : item.label}
          />
        ))}
      </nav>
    </div>
  );
}
