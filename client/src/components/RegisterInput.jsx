import React from "react";

export default function RegisterInput({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-md mx-auto">
      {/* card header */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex flex-col text-left">
          <h2 className="text-xl font-bold">Create your account</h2>
          <p className="text-sm text-gray-500">
            Enter your details below to create a new account
          </p>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="text-green-600 text-md whitespace-nowrap hover:text-green-800 transition-transform active:scale-95"
          >
            Login
          </button>
        </div>
      </div>

      {/* card content */}
      <div className="mb-6">{children}</div>

      {/* card footer */}
      <div>
        <button
          type="button"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-200 transition-transform active:scale-98"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
