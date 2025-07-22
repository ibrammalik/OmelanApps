import React from "react";
import { Wallet } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export default function TotalEarnings({ value = "$0" }) {
  return (
    <StatCard
      title="Total Earnings"
      value={value}
      icon={Wallet}
      iconColor="text-green-400"
    />
  );
}
