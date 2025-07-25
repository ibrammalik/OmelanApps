import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const STATUS = [
  "Semua",
  "Menunggu Konfirmasi",
  "Sedang Berlangsung",
  "Selesai",
];

const statusColor = {
  "Menunggu Konfirmasi": "text-yellow-600",
  "Sedang Berlangsung": "text-blue-600",
  Selesai: "text-green-600",
};

export default function CaregiverAppointment() {
  const [activeStatus, setActiveStatus] = useState("Semua");
  const [appointmentList, setAppointmentList] = useState([
    {
      id: 1,
      name: "Luffy",
      date: "22 September 2025",
      status: "Menunggu Konfirmasi",
    },
    {
      id: 2,
      name: "Nami",
      date: "23 September 2025",
      status: "Sedang Berlangsung",
    },
    {
      id: 3,
      name: "Zoro",
      date: "21 September 2025",
      status: "Selesai",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAppointmentList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredAppointments =
    activeStatus === "Semua"
      ? appointmentList
      : appointmentList.filter((item) => item.status === activeStatus);

  return (
    <div className="space-y-4 rounded-lg p-4 shadow bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Janji Temu</h2>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-2">
        {STATUS.map((status) => (
          <Button
            key={status}
            variant={activeStatus === status ? "default" : "outline"}
            onClick={() => setActiveStatus(status)}
            className="text-sm"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAppointments.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border p-2 rounded-lg justify-between"
          >
            <div className="flex gap-4 items-center px-2">
              <Avatar className="w-12 h-12 rounded-lg">
                <AvatarFallback className="text-base font-medium bg-blue-100 text-blue-700">
                  {item.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-400">{item.date}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-right min-w-[160px] p-2">
              <span
                className={`text-sm font-medium ${
                  statusColor[item.status] || "text-gray-500"
                }`}
              >
                {item.status}
              </span>

              {(item.status === "Menunggu Konfirmasi" ||
                item.status === "Sedang Berlangsung") && (
                <div className="pt-1">
                  {item.status === "Menunggu Konfirmasi" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() =>
                        handleStatusChange(item.id, "Sedang Berlangsung")
                      }
                    >
                      Konfirmasi
                    </Button>
                  )}
                  {item.status === "Sedang Berlangsung" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleStatusChange(item.id, "Selesai")}
                    >
                      Selesaikan
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <p className="text-start text-gray-400 px-4">Tidak ada janji temu.</p>
        )}
      </div>
    </div>
  );
}
