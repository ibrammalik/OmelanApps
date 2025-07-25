import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

const STATUS = [
  "Semua",
  "Menunggu Konfirmasi",
  "Sedang Berlangsung",
  "Selesai",
];

const dummyResponses = [
  {
    id: 1,
    name: "Tom Lembong",
    photoUrl: "",
    date: "29 April 2025",
    status: "Menunggu Konfirmasi",
  },
  {
    id: 2,
    name: "Sarah Wijaya",
    photoUrl: "",
    date: "28 April 2025",
    status: "Sedang Berlangsung",
  },
  {
    id: 3,
    name: "Bayu Aditya",
    photoUrl: "",
    date: "27 April 2025",
    status: "Selesai",
  },
];

const statusColor = {
  "Menunggu Konfirmasi": "text-yellow-600",
  "Sedang Berlangsung": "text-blue-600",
  Selesai: "text-green-600",
};

export default function RequestSummary() {
  const [activeStatus, setActiveStatus] = useState("Semua");

  const filteredResponses =
    activeStatus === "Semua"
      ? dummyResponses
      : dummyResponses.filter((res) => res.status === activeStatus);

  return (
    <div className="rounded-lg p-4 shadow-md space-y-2">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Daftar Permintaan
        </h2>
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

      <div className="space-y-2">
        {filteredResponses.map((response) => (
          <div
            key={response.id}
            className="flex items-center justify-between border p-4 rounded-lg transition"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 rounded-lg">
                <AvatarFallback className="text-lg font-medium bg-blue-100 text-blue-700">
                  {response.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{response.name}</p>
                <p className="text-sm text-muted-foreground">{response.date}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`text-sm font-medium ${
                  statusColor[response.status] || "text-gray-600"
                }`}
              >
                {response.status}
              </span>
            </div>
          </div>
        ))}
        {filteredResponses.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-4">
            Tidak ada permintaan saat ini.
          </div>
        )}
      </div>
    </div>
  );
}
