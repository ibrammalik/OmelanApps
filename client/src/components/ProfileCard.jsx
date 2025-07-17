import React from "react";
import { Button } from "./ui/button";

export default function ProfileCard({ profileImage, onChangeImage, children }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 rounded-lg">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center gap-4 w-full md:w-1/3 rounded-lg px-6 py-6 shadow">
        <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={profileImage}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <Button variant="outline" onClick={onChangeImage}>
          Change Image
        </Button>
      </div>

      {/* Details Section */}
      <div className="flex-1 grid gap-6 rounded-lg px-6 py-6 shadow">
        {children}
      </div>
    </div>
  );
}
