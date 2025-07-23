import React from "react";
import StatCard from "../dashboard/StatCard";
import { Star } from "lucide-react";

export default function OvewviewRating({ value = 0 }) {
  return (
    <StatCard
      title="Rating Keseluruhan"
      value={value}
      icon={Star}
      iconColor="text-yellow-400"
    />
  );
}
