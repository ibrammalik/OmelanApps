import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function AvailableSummary({
  availableDates = [],
  onDeleteDate,
  loading,
}) {
  const formatTanggalIndonesia = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // if (availableDates.length === 0) {
  //   return <p className="text-start text-gray-400">Belum ada jadwal.</p>;
  // }

  if (loading)
    return <p className="text-sm text-muted-foreground">⏳ Memuat jadwal...</p>;

  if (!availableDates.length)
    return (
      <p className="text-sm text-muted-foreground">
        📭 Belum ada jadwal tersedia.
      </p>
    );

  return (
    <ul className="space-y-2">
      {availableDates.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between rounded py-1 px-2"
        >
          <span>{formatTanggalIndonesia(item.date_start)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-white"
            onClick={() => onDeleteDate(item.id)}
          >
            <Trash2 size={16} />
          </Button>
        </li>
      ))}
    </ul>
  );
}
