import React from "react";
import RegisterInput from "../RegisterInput";

export default function CaregiverInput() {
  return (
    <RegisterInput title="Caregiver Registration">
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
          <label htmlFor="experience" className="block text-left mb-1">
            Years of Experience
          </label>
          <input
            id="experience"
            type="number"
            min="0"
            className="w-full border rounded px-3 py-2 transition-transform duration-200 focus:scale-98 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="specialization" className="block text-left mb-1">
            Specialization
          </label>
          <input
            id="specialization"
            type="text"
            className="w-full border rounded px-3 py-2 transition-transform duration-200 focus:scale-98 focus:outline-none"
          />
        </div>
      </form>
    </RegisterInput>
  );
}
