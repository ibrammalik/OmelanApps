import React from "react";
import StatCard from "../dashboard/StatCard";
import { Star } from "lucide-react";

export default function OvewviewRating({ value = 0 }) {
  return (
    <StatCard
      title="Overview Ratings"
      value={value}
      icon={Star}
      iconColor="text-yellow-400"
    />
  );
}
