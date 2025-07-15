import React from "react";
import RegisterInput from "../RegisterInput";

export default function UserInput() {
  return (
    <RegisterInput title="User Registration">
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-left mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2 transition-transform duration-200 focus:scale-98 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-left mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded px-3 py-2 transition-transform duration-200 focus:scale-98 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-left mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border rounded px-3 py-2 transition-transform duration-200 focus:scale-98 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-left mb-1">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            className="w-full border rounded px-3 py-2 transition-transform duration-200 focus:scale-98 focus:outline-none"
          />
        </div>
      </form>
    </RegisterInput>
  );
}
