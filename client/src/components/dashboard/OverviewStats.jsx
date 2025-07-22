import React from "react";
import TotalAppointments from "../caregivers/TotalAppointments";
import TotalEarnings from "../caregivers/TotalEarnings";
import OvewviewRating from "../caregivers/OverviewRating";

export default function OverviewStats({ role, data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {role === "caregiver" && (
        <>
          <TotalAppointments value={data?.appointments} />
          <TotalEarnings value={`$${data?.earnings}`} />
          <OvewviewRating />
        </>
      )}

      {role === "user" && (
        <>
          <TotalAppointments value={data?.appointments} />
        </>
      )}
    </div>
  );
}
