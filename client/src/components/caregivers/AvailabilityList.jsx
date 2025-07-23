import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import ROUTES from "@/routes/route";
import ExpandableText from "../ExpandableText";

export default function AvailabilityList() {
  const availabilities = [
    "2025-07-21",
    "2025-07-25",
    "2025-08-01",
    "2025-08-02",
    "2025-08-03",
    "2025-08-04",
    "2025-08-05",
    "2025-08-06",
    "2025-08-07",
    "2025-08-08",
    "2025-08-09",
    "2025-08-10",
  ];

  const formattedDates = availabilities.map((date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Jadwal Ketersediaan</h2>
        <Link
          to={ROUTES.caregiver.availability}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Atur Jadwal
        </Link>
      </div>
      <Separator />
      <div className="mt-3 p-2">
        <ExpandableText items={formattedDates} maxVisible={10} />
      </div>
    </div>
  );
}
