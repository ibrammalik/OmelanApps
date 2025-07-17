import React from "react";
import profileImage from "../../assets/images/profile.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProfileCard from "../ProfileCard";

export default function CaregiverProfile() {
  return (
    <ProfileCard profileImage={profileImage} onChangeImage={() => {}}>
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className="border border-input rounded-md px-3 py-2 text-sm"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <textarea
          id="address"
          rows="3"
          className="border border-input rounded-md px-3 py-2 text-sm"
          placeholder="Enter your full address"
          required
        ></textarea>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input id="contact" type="tel" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input id="experience" type="number" min="0" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="specialization">Specialization</Label>
        <Input id="specialization" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="certificate">Upload Certificate</Label>
        <Input id="certificate" type="file" accept=".pdf,.jpg,.png" />
      </div>
    </ProfileCard>
  );
}
