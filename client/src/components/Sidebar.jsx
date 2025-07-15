import React from "react";
import ProfileCard from "./ProfileCard";
import UserDashboard from "./users/UserDashboard";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow h-screen flex flex-col justify-between">
      {/* sidebar header */}
      <div className="p-4 border-b text-left font-bold text-xl text-blue-600">
        OMELAN
      </div>
      {/* sidebar content */}
      <div>
        <UserDashboard />
      </div>
      {/* sidebar footer */}
      <div className="p-4 border-t flex items-center justify-between w-full space-x-3">
        <ProfileCard />
      </div>
    </div>
  );
}
