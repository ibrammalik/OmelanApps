import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { caregiver } from "@/utils/profile";

export default function UserAppointment() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4 rounded-lg p-6 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Book Appointment</h2>{" "}
        <div className="flex gap-4">
          <input
            type="date"
            min={today}
            className="border rounded px-2 py-1 text-sm"
          />
          <Button>Search</Button>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <img
            src={caregiver.profileImageUrl}
            alt={caregiver.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{caregiver.name}</p>
            <p className="text-sm text-muted-foreground">{caregiver.email}</p>
          </div>
        </div>
        <Button>Book Appointment</Button>
      </div>
    </div>
  );
}
