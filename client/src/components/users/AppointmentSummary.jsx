import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ReviewForm from "./ReviewForm";
import { Dialog, DialogContent } from "../ui/dialog";

export default function AppointmentSummary() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg p-4 shadow-md space-y-2">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Janji Temu Selesai
        </h2>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between border p-4 rounded-lg transition">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 rounded-lg">
              <AvatarFallback className="text-lg font-medium bg-blue-100 text-blue-700">
                T
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Tom Lembong</p>
              <p className="text-sm text-muted-foreground">6 July 2025</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              onClick={() => setOpen(true)}
            >
              Beri Nilai
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <ReviewForm onSubmit={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
