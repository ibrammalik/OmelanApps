import React from "react";

export default function LoginInput() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-md mx-auto">
      {/* card header */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex flex-col text-left">
          <h2 className="text-xl font-bold">Login to your account</h2>
          <p className="text-sm text-gray-500">
            Enter your details below to login to your account
          </p>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="text-green-600 text-md whitespace-nowrap hover:text-green-800 transition-transform active:scale-95"
          >
            Register
          </button>
        </div>
      </div>

      {/* card content */}
      <form className="space-y-4 mb-6">
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
      </form>

      {/* card footer */}
      <div>
        <button
          type="button"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-200 transition-transform active:scale-98"
        >
          Login
        </button>
      </div>
    </div>
  );
}
