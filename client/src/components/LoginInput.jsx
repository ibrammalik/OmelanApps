import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function LoginInput({
  email,
  onEmailChange,
  password,
  onPasswordChange,
}) {
  return (
    <div className="flex flex-col gap-6">
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
