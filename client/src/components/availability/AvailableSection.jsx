import React, { useState } from "react";
import { Separator } from "../ui/separator";
import AddAvailableModal from "./AddAvailableModal";
import AvailableSummary from "./AvailableSummary";

export default function AvailableSection() {
  const [availableDates, setAvailableDates] = useState([]);

  const handleAddDate = (newDate) => {
    if (!availableDates.includes(newDate)) {
      setAvailableDates([...availableDates, newDate]);
    }
  };

  const handleDeleteDate = (dateToRemove) => {
    setAvailableDates(availableDates.filter((d) => d !== dateToRemove));
  };

  return (
    <div className="space-y-4 rounded-lg p-6 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Jadwal Ketersediaan</h2>
        <div className="flex justify-end">
          <AddAvailableModal
            onAddDate={handleAddDate}
            existingDates={availableDates}
          />
        </div>
      </div>
      <Separator />
      <AvailableSummary
        availableDates={availableDates}
        onDeleteDate={handleDeleteDate}
      />
    </div>
  );
}
