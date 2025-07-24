import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

export default function RecentReview() {
  return (
    <div className="rounded-lg shadow p-4 space-y-3">
      <h2 className="text-base font-semibold">Recent Review</h2>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Dana</p>
            <p className="text-xs text-gray-500">22 July 2025</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 truncate max-w-[120px] text-right">
          Bagus banget
        </p>
      </div>
    </div>
  );
}
