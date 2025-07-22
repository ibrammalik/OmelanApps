import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CaregiverInput({
  name,
  onNameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  experience,
  onExperienceChange,
  specialization,
  onSpecializationChange,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={onNameChange} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="emai"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          type="number"
          min="0"
          value={experience}
          onChange={onExperienceChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="specialization">Specialization</Label>
        <Input
          id="specialization"
          value={specialization}
          onChange={onSpecializationChange}
          required
        />
      </div>
    </div>
  );
}
