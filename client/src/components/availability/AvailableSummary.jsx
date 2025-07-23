import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function AvailableSummary({
  availableDates = [],
  onDeleteDate,
}) {
  const formatTanggalIndonesia = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (availableDates.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada jadwal.</p>;
  }

  return (
    <ul className="space-y-2">
      {availableDates.map((date) => (
        <li
          key={date}
          className="flex items-center justify-between rounded py-1 px-2"
        >
          <span>{formatTanggalIndonesia(date)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-white"
            onClick={() => onDeleteDate(date)}
          >
            <Trash2 size={16} />
          </Button>
        </li>
      ))}
    </ul>
  );
}
