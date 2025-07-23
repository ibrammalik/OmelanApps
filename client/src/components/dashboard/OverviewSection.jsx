import React from "react";
import AppointmentList from "../caregivers/AppointmentList";
import AvailabilityList from "../caregivers/AvailabilityList";
import AppointmentSchedule from "../users/AppointmentSchedule";
import RequestList from "../users/RequestLists";

export default function OverviewSection({ role }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {role === "caregiver" && (
        <>
          <AppointmentList />
          <AvailabilityList />
        </>
      )}
      {role === "user" && (
        <>
          <RequestList />
          <AppointmentSchedule />
        </>
      )}
    </div>
  );
}
