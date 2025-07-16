import { Button } from "./ui/button";

export function SidebarItem({ icon, label }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 text-sm hover:bg-muted"
    >
      {icon}
      {label && <span>{label}</span>}
    </Button>
  );
}
