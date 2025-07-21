import React, { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Clock4 } from "lucide-react";
import { morningSlots, afternoonSlots, days } from "@/utils/time-slots";

export default function CaregiverAvailability({
  defaultAvailability = {},
  onSave,
  onCancel,
  mode = "add",
  currentAvailability = {},
  fixedDay = null,
}) {
  const [selectedDay, setSelectedDay] = useState(fixedDay);
  const [availability, setAvailability] = useState(defaultAvailability);

  const targetDay = fixedDay || selectedDay;

  const toggleSlot = (slot) => {
    setAvailability((prev) => {
      const daySlots = new Set(prev[selectedDay] || []);
      if (daySlots.has(slot)) {
        daySlots.delete(slot);
      } else {
        daySlots.add(slot);
      }
      return { ...prev, [targetDay]: Array.from(daySlots) };
    });
  };

  const renderSlotButton = (slot) => {
    const isSelected = availability[targetDay]?.includes(slot);

    return (
      <button
        key={slot}
        onClick={() => toggleSlot(slot)}
        className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-sm cursor-pointer ${
          isSelected ? "bg-blue-500 text-white" : "bg-muted"
        }`}
      >
        <Clock4 size={16} />
        {slot}
      </button>
    );
  };

  const handleSave = () => {
    if (!(availability[targetDay] || []).length) {
      alert("Time cannot be empty.");
      return;
    }
    onSave({ [targetDay]: availability[targetDay].slice() });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Available Slots</h2>
      <Separator />

      {mode === "add" && (
        <>
          <h3 className="font-medium">Select Available Days</h3>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => {
              const isDisabled = currentAvailability[day];
              return (
                <Button
                  className="cursor-pointer"
                  key={day}
                  variant={day === selectedDay ? "default" : "outline"}
                  onClick={() => setSelectedDay(day)}
                  disabled={isDisabled}
                >
                  {day}
                </Button>
              );
            })}
          </div>
        </>
      )}

      <div className="border rounded-lg p-4 space-y-3">
        <h4 className="font-medium">Morning</h4>
        <div className="flex flex-wrap gap-2">
          {morningSlots.map(renderSlotButton)}
        </div>

        <h4 className="font-medium mt-4">Afternoon</h4>
        <div className="flex flex-wrap gap-2">
          {afternoonSlots.map(renderSlotButton)}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="cursor-pointer" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="cursor-pointer" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
