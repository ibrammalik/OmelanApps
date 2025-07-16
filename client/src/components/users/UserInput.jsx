import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function UserInput() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" required />
      </div>
    </div>
  );
}
