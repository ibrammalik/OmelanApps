import React from "react";
import { NotebookPen } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export default function TotalReview({ value = 0 }) {
  return (
    <StatCard
      title="Total Review"
      value={value}
      icon={NotebookPen}
      iconColor="text-yellow-400"
    />
  );
}
