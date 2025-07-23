import React from "react";
import { ShoppingCart } from "lucide-react";
import StatCard from "../dashboard/StatCard";

export default function TotalOrders({ value = 0 }) {
  return (
    <StatCard
      title="Total Pesanan"
      value={value}
      icon={ShoppingCart}
      iconColor="text-green-400"
    />
  );
}
