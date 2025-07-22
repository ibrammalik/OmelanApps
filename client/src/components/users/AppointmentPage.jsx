import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { caregiver } from "@/utils/profile";
import UserRequest from "./UserRequests";

export default function AppointmentPage() {
  const today = new Date().toISOString().split("T")[0];

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const handleBook = () => {
    setRequest({
      caregiver: caregiver,
      appointmentDate: today,
    });
    setStatus("Menunggu Konfirmasi");
  };

  const handleConfirm = () => {
    setStatus("Diterima");
  };

  const handleComplete = () => {
    setShowReview(true);
  };

  const handleSubmitReview = (review) => {
    console.log("Review Submitted:", review);
    setShowReview(false);
    setRequest(null);
    setStatus(null);
  };

  return (
    <div className="space-y-8">
      {/* Komponen UserAppointment */}
      <div className="space-y-4 rounded-lg p-6 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Book Appointment</h2>
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
          <Button onClick={handleBook}>Book Appointment</Button>
        </div>
      </div>

      {/* Komponen UserRequest */}
      {request && (
        <UserRequest
          caregiver={request.caregiver}
          appointmentDate={request.appointmentDate}
          status={status}
          onComplete={handleComplete}
        />
      )}

      {/* Simulasi konfirmasi caregiver */}
      {status === "Menunggu Konfirmasi" && (
        <Button onClick={handleConfirm}>Simulasikan Caregiver Menerima</Button>
      )}

      {/* Komponen UserReview */}
      {showReview && (
        <UserReview
          caregiver={request?.caregiver}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </div>
  );
}
