import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import ROUTES from "@/routes/route";

export default function AppointmentSchedule() {
  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Janji Temu Mendatang</h2>
        <Link
          to={ROUTES.caretaker.appointment}
          className="text-gray-600 text-sm"
        >
          Atur Jadwal
        </Link>
      </div>
      <Separator />
      <div className="space-y-2 mt-4 px-2">
        <div className="flex items-center">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700">
                O
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold truncate">Bambang</p>
          </div>
          <p className="text-sm text-gray-600 text-center">22 July 2025</p>
        </div>
      </div>
    </div>
  );
}
