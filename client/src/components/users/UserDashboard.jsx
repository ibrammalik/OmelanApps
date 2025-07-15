import React from "react";
import { House, CalendarCheck2 } from "lucide-react";

export default function UserDashboard() {
  return (
    <>
      <ul>
        <li>
          <House /> Dashboard
        </li>
        <li>My Requests</li>
        <li>
          <CalendarCheck2 /> My Appointments
        </li>
      </ul>
    </>
  );
}
