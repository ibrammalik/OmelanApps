import React from "react";
import { Heart } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export default function TotalFavorite({ value = 0 }) {
  return (
    <StatCard
      title="Disukai"
      value={value}
      icon={Heart}
      iconColor="text-pink-400"
    />
  );
}
