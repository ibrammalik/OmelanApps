import { useState } from "react";
import AddSlotModal from "./AddSlotModal";
import { Separator } from "../ui/separator";
import AvailabilitySummary from "./AvailabilitySummary";
import EditSlotModal from "./EditSlotModal";
import { allSlots } from "@/utils/time-slots";

export default function AvailabilitySection() {
  const [availability, setAvailability] = useState({});
  const [editDay, setEditDay] = useState(null);

  const handleAddSlots = (newAvailability) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      Object.entries(newAvailability).forEach(([day, slots]) => {
        updated[day] = slots.sort(
          (a, b) => allSlots.indexOf(a) - allSlots.indexOf(b)
        );
      });
      return updated;
    });
  };

  const handleEditDaySlots = (day, newSlots) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...newSlots].sort(
        (a, b) => allSlots.indexOf(a) - allSlots.indexOf(b)
      ),
    }));
  };

  const handleRemoveDay = (day) => {
    setAvailability((prev) => {
      const updated = { ...prev };
      delete updated[day];
      return updated;
    });
  };

  return (
    <div className="space-y-4 rounded-lg p-6 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Available Slots</h2>
        <div className="flex justify-end">
          <AddSlotModal
            onSave={handleAddSlots}
            currentAvailability={availability}
          />
        </div>
      </div>

      <Separator />

      <AvailabilitySummary
        availability={availability}
        onRemoveDay={handleRemoveDay}
        onEditDay={setEditDay}
      />

      {editDay && (
        <EditSlotModal
          day={editDay}
          existingSlots={availability[editDay] || []}
          currentAvailability={availability}
          onSave={(slots) => {
            handleEditDaySlots(editDay, slots);
            setEditDay(null);
          }}
          onCancel={() => setEditDay(null)}
        />
      )}
    </div>
  );
}
