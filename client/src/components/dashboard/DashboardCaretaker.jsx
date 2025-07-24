import React from "react";
import OverviewStats from "./OverviewStats";
import OverviewSection from "./OverviewSection";

export default function DashboardCaretaker() {
  return (
    <>
      <OverviewStats role="user" />
      <OverviewSection role="user" />
    </>
  );
}
