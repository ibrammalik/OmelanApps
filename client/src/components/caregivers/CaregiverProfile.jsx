import React, { useEffect, useState } from "react";

import CaregiverProfileSummary from "./CaregiverProfileSummary";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CaregiverProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    contact: "",
    experience: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("tempRegisterData");
    if (data) setProfile(JSON.parse(data));
  }, []);

  const handleChange = (field) => (e) => {
    const value = field === "certificate" ? e.target.files[0] : e.target.value;
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("tempRegisterData", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const data = localStorage.getItem("tempRegisterData");
    if (data) setProfile(JSON.parse(data));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <CaregiverProfileSummary
        profile={profile}
        onEdit={() => setIsEditing(true)}
      />
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={profile.name}
          onChange={handleChange("name")}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className="border border-input rounded-md px-3 py-2 text-sm"
          value={profile.gender}
          onChange={handleChange("gender")}
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
          value={profile.address}
          onChange={handleChange("address")}
          required
        ></textarea>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input
          id="contact"
          type="tel"
          value={profile.contact}
          onChange={handleChange("contact")}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={handleChange("email")}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          type="number"
          min="0"
          value={profile.experience}
          onChange={handleChange("experience")}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={handleCancel}>
          Batal
        </Button>
        <Button onClick={handleSave}>Simpan</Button>
      </div>
    </Card>
  );
}
