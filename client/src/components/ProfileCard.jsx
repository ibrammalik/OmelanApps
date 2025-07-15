import React from "react";
import { LogOut } from "lucide-react";
import profileImage from "../assets/profile.png";

export default function ProfileCard() {
  return (
    <>
      <div className="flex items-center space-x-3 overflow-hidden">
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-left max-w-[140px] truncate">
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-gray-500 truncate">
            johnhernandes@example.com
          </div>
        </div>
      </div>
      <button className=" text-red-500 p-2 rounded-full hover:text-white hover:bg-red-400 transition">
        <LogOut size={18} />
      </button>
    </>
  );
}
