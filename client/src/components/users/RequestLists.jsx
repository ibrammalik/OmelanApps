import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import ROUTES from "@/routes/route";

export default function RequestList() {
  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Permintaan</h2>
        <Link to={ROUTES.caretaker.order} className="text-gray-600 text-sm">
          Lihat
        </Link>
      </div>
      <Separator />
      <div className="space-y-2 mt-2 px-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-4 mb-1">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700">
                O
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Joni</p>
              <p className="text-sm text-gray-600">22 Mei 2025</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Menunggu konfirmasi</p>
        </div>
      </div>
    </div>
  );
}
