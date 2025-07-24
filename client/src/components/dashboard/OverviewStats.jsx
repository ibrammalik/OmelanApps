import React from "react";
import TotalAppointments from "../caregivers/TotalAppointments";
import TotalEarnings from "../caregivers/TotalEarnings";
import OvewviewRating from "../caregivers/OverviewRating";
import CompletedAppointment from "../users/CompletedAppointment";
import TotalOrders from "../users/TotalOrders";
import TotalFavorite from "../users/TotalFavorite";

export default function OverviewStats({ role }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {role === "caregiver" && (
        <>
          <TotalAppointments />
          <TotalEarnings />
          <OvewviewRating />
        </>
      )}

      {role === "user" && (
        <>
          <TotalOrders />
          <CompletedAppointment />
          <TotalFavorite />
        </>
      )}
    </div>
  );
}
