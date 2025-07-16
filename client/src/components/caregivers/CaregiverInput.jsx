import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CaregiverInput() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input id="experience" type="number" min="0" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="specialization">Specialization</Label>
        <Input id="specialization" required />
      </div>
    </div>
  );
}
