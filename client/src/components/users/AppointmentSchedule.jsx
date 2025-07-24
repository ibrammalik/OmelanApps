import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export default function AppointmentSchedule() {
  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Janji Temu Mendatang</h2>
        <Link className="text-gray-600 text-sm">Atur Jadwal</Link>
      </div>
      <Separator />
      <div className="space-y-2 mt-4">
        <div className="flex items-center">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarFallback className="rounded-lg">O</AvatarFallback>
            </Avatar>
            <p className="font-semibold truncate">Bambang</p>
          </div>
          <p className="text-sm text-gray-600 text-center">22 July 2025</p>
        </div>
      </div>
    </div>
  );
}
