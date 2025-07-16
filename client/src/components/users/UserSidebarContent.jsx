import React from "react";
import { House, CalendarCheck2, List } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function UserSidebarContent() {
  return (
    <div className="px-2 py-4 space-y-4">
      <div>
        <Separator className="mb-2" />

        <nav className="space-y-1">
          <SidebarItem icon={<House size={16} />} label="Dashboard" />
          <SidebarItem icon={<List size={16} />} label="My Requests" />
          <SidebarItem
            icon={<CalendarCheck2 size={16} />}
            label="My Appointments"
          />
        </nav>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 text-sm hover:bg-muted"
    >
      {icon}
      {label}
    </Button>
  );
}
