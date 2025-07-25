import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Star } from "lucide-react";
// import { useFavoriteCaregivers } from "@/hooks/useFavoriteCaregivers";

export default function UserAppointment() {
  const today = new Date().toISOString().split("T")[0];
  // const { toggleFavorite, isFavorite } = useFavoriteCaregivers();

  const caregivers = [
    { id: 1, name: "Dewi Kartika", phone: "0812-3456-7890" },
    { id: 3, name: "Siti Nurhaliza", phone: "0821-9876-5432" },
    { id: 5, name: "Rina Wijaya", phone: "0882-7654-3210" },
  ];

  return (
    <div className="rounded-lg p-4 shadow-md space-y-2">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Atur Janji Temu
        </h2>
        <div className="flex gap-3">
          <input
            type="date"
            min={today}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Cari
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        {caregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className="flex items-center justify-between border p-4 rounded-lg transition"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 rounded-lg">
                <AvatarFallback className="text-lg font-medium bg-blue-100 text-blue-700">
                  {caregiver.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{caregiver.name}</p>
                <p className="text-sm text-muted-foreground">
                  {caregiver.phone}
                </p>
              </div>
            </div>
            <p>22 Maret 2025</p>
            <div className="flex gap-2">
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(caregiver)}
                className="hover:bg-transparent"
              >
                <Star
                  className={`w-8 h-8 ${
                    isFavorite(caregiver.id)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-400"
                  }`}
                />
              </Button> */}

              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Buat Jadwal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
