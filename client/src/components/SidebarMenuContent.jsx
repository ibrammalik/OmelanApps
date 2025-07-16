import { SidebarItem } from "./SidebarItem";
import { Separator } from "./ui/separator";
import { useSidebar } from "./ui/sidebar";

export default function SidebarMenuContent({ items }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className={collapsed ? "px-1 space-y-4" : "px-3 space-y-4"}>
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
