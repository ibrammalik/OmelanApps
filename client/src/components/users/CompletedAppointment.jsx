import React from "react";
import { CalendarCheck2 } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export default function CompletedAppointment({ value = 0 }) {
  return (
    <StatCard
      title="Janji Temu Selesai"
      value={value}
      icon={CalendarCheck2}
      iconColor="text-blue-400"
    />
  );
}
