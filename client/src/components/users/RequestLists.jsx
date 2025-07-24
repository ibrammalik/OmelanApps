import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export default function RequestList() {
  return (
    <div className="shadow p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Permintaan</h2>
        <Link className="text-gray-600 text-sm">Lihat</Link>
      </div>
      <Separator />
      <div className="space-y-2 mt-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-4 mb-1">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarFallback className="rounded-lg">O</AvatarFallback>
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
