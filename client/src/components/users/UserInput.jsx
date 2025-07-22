import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function UserInput({
  name,
  onNameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  dob,
  onDobChange,
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
          type="email"
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
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          value={dob}
          onChange={onDobChange}
          required
        />
      </div>
    </div>
  );
}
