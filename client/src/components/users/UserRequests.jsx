import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function UserRequest({
  caregiver,
  appointmentDate,
  status,
  onComplete,
}) {
  return (
    <div className="space-y-4 rounded-lg p-6 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Request</h2>
        <p>Waiting Approval</p>
      </div>

      <Separator />

      {caregiver ? (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Caregiver:</span> {caregiver.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {caregiver.email}
          </p>
          <p>
            <span className="font-medium">Date:</span> {appointmentDate}
          </p>
          <p>
            <span className="font-medium">Status:</span> {status}
          </p>
          {status === "Diterima" && (
            <Button onClick={onComplete}>Complete</Button>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground">No requests.</p>
      )}
    </div>
  );
}
