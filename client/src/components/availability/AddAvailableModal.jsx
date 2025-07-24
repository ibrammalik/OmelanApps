import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CaregiverAvailable from "../caregivers/CaregiverAvailable";

export default function AddAvailableModal({ onAddDate, existingDates = [] }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (date) => {
    if (onAddDate) onAddDate(date);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl lg:max-w-3xl">
        <CaregiverAvailable
          onSubmit={handleAdd}
          onClose={handleClose}
          existingDates={existingDates}
        />
      </DialogContent>
    </Dialog>
  );
}
