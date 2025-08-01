import React, { useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ReviewForm from "./ReviewForm";
import { Dialog, DialogContent } from "../ui/dialog";
import { getReviewSummaryForClient } from "../../utils/api";
import StarRating from "../StarRating";

export default function AppointmentSummary() {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getReviewSummaryForClient();
      console.log(data);

      setAppointments(data);
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  };

  const handleOpenReview = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleReviewSubmitted = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
    fetchAppointments();
  };

  return (
    <div className="rounded-lg p-4 shadow-md space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Janji Temu Selesai
      </h2>

      <Separator />

      <div className="space-y-2">
        {appointments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada janji temu selesai.
          </p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className="flex items-center justify-between border p-4 rounded-lg transition"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 rounded-lg">
                  {appointment.partner_photo ? (
                    <img
                      src={appointment.partner_photo}
                      alt={appointment.partner_name}
                      className="rounded-lg w-12 h-12 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-lg font-medium bg-blue-100 text-blue-700">
                      {appointment.partner_name?.charAt(0) || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{appointment.partner_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(appointment.appointment_date).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                {appointment.rating === null || appointment.comment === null ? (
                  <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    onClick={() => handleOpenReview(appointment)}
                  >
                    Beri Nilai
                  </Button>
                ) : (
                  <div className="text-right max-w-xs">
                    <StarRating rating={appointment.rating} />
                    <p className="text-sm mt-1 text-gray-600">
                      {appointment.comment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          {selectedAppointment && (
            <ReviewForm
              appointmentId={selectedAppointment.appointment_id}
              defaultRating={selectedAppointment.rating}
              defaultComment={selectedAppointment.comment}
              onSubmit={handleReviewSubmitted}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
