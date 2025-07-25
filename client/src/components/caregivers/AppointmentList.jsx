import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import ROUTES from "@/routes/route";

export default function AppointmentList() {
  const appointments = [
    {
      id: 1,
      name: "Bambang",
      date: "2025-07-22",
    },
    {
      id: 2,
      name: "Siti Aminah",
      date: "2025-07-21",
    },
    {
      id: 3,
      name: "Dewi Sartika",
      date: "2025-07-20",
    },
    {
      id: 4,
      name: "Rudi Hartono",
      date: "2025-07-19",
    },
    {
      id: 5,
      name: "Agus Salim",
      date: "2025-07-18",
    },
  ];

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">
          Daftar Permintaan
        </h2>
        <Link
          to={ROUTES.caregiver.appointment}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Lihat
        </Link>
      </div>
      <Separator />

      {appointments.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 items-center mt-2 border p-2 rounded-lg"
        >
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-8 h-8 rounded-lg">
              <AvatarFallback className="text-base font-semibold bg-blue-100 text-blue-700">
                {item.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-md font-semibold text-gray-800 truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-right">
            Menunggu konfirmasi
          </p>
        </div>
      ))}
    </div>
  );
}
