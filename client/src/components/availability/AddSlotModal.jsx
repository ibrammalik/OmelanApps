import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CaregiverAvailability from "../caregivers/CaregiverAvailability";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function AddSlotModal({ onSave, currentAvailability }) {
  const [open, setOpen] = useState(false);

  const handleSave = (newSlots) => {
    const hasAnySlots = Object.values(newSlots).some(
      (slots) => slots.length > 0
    );
    if (!hasAnySlots) {
      alert("Harus memilih waktu.");
      return;
    }
    onSave(newSlots);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus size={16} />
          Add Slots
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl lg:max-w-3xl">
        <CaregiverAvailability
          mode="add"
          currentAvailability={currentAvailability}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
