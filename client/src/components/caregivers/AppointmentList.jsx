import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export default function AppointmentList() {
  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold mb-3">Daftar Permintaan</h2>
        <Link className="text-gray-600 text-sm">Lihat</Link>
      </div>
      <Separator />
      <div className="flex items-center mt-2">
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarFallback className="rounded-lg">O</AvatarFallback>
          </Avatar>
          <p className="font-semibold truncate">Bambang</p>
        </div>
        <p className="text-sm text-gray-600 text-center">22 July 2025</p>
      </div>
    </div>
  );
}
