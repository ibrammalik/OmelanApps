import React from "react";
import OverviewStats from "./OverviewStats";
import OverviewSection from "./OverviewSection";

export default function DashboardCaregiver() {
  return (
    <>
      <OverviewStats role="caregiver" />
      <OverviewSection role="caregiver" />
    </>
  );
}
