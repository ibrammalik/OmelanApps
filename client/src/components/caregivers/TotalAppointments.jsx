import React from "react";
import { CalendarCheck2 } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export default function TotalAppointments({ value = 0 }) {
  return (
    <StatCard
      title="Appointments Completed"
      value={value}
      icon={CalendarCheck2}
      iconColor="text-blue-400"
    />
  );
}
