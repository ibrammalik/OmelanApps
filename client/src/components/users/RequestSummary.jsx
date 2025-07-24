import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function RequestSummary() {
  return (
    <div className="rounded-lg p-4 shadow-md space-y-2">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Daftar Permintaan
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
              <p className="text-sm text-muted-foreground">29 April 2025</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {" "}
            <span className="text-sm font-medium text-gray-600">
              Menunggu Konfirmasi
            </span>
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
