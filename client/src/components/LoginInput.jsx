import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function LoginInput({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  role,
  onChangeRole,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <label className="block text-sm">Login sebagai</label>
        <select
          value={role}
          onChange={onChangeRole}
          className="w-full p-2 border rounded"
        >
          <option value="caretaker">Client (Caretaker)</option>
          <option value="caregiver">Partner (Caregiver)</option>
        </select>
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
        <div className="flex items-center">
          <Label htmlFor="password">Kata Sandi</Label>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
    </div>
  );
}
