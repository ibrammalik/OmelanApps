import React, { useEffect, useState } from "react";
import profileImage from "../../assets/images/profile.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProfileCard from "../ProfileCard";

export default function CaregiverProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    contact: "",
    experience: "",
    specialization: "",
    certificate: null,
  });

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

  return (
    <ProfileCard profileImage={profileImage} onChangeImage={() => {}}>
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

      <div className="grid gap-2">
        <Label htmlFor="specialization">Specialization</Label>
        <Input
          id="specialization"
          value={profile.specialization}
          onChange={handleChange("specialization")}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="certificate">Upload Certificate</Label>
        <Input
          id="certificate"
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={handleChange("certificate")}
        />
        {profile.certificate && (
          <p className="text-sm text-muted-foreground">
            {profile.certificate.name}
          </p>
        )}
      </div>
    </ProfileCard>
  );
}
