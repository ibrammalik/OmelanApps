import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CaregiverAvailability from "../caregivers/CaregiverAvailability";

export default function EditSlotModal({
  day,
  existingSlots,
  currentAvailability,
  onSave,
  onCancel,
}) {
  const [open, setOpen] = useState(true);

  const handleSave = (editedSlots) => {
    onSave(editedSlots[day] || []);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-2xl lg:max-w-3xl">
        <CaregiverAvailability
          mode="edit"
          defaultAvailability={{ [day]: existingSlots }}
          currentAvailability={currentAvailability}
          onSave={handleSave}
          onCancel={onCancel}
          fixedDay={day}
        />
      </DialogContent>
    </Dialog>
  );
}
