import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export default function AvailabilityList() {
  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-base font-semibold mb-3">Jadwal Ketersediaan</h2>
        <Link className="text-gray-600 text-sm">Atur Jadwal</Link>
      </div>
      <Separator />
      <div className="flex items-center mt-2">
        <p className="text-base">21 Juli 2025</p>
      </div>
    </div>
  );
}
