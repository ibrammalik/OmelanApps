import React from "react";

export default function AppointmentList({ appointments = [] }) {
  if (appointments.length === 0) {
    return <p className="text-gray-500">No appointments found.</p>;
  }

  return (
    <div className="space-y-2">
      {appointments.map((item) => (
        <div key={item.id} className="flex justify-between">
          <p className="font-semibold">{item.caretakerName}</p>
          <p className="text-sm text-gray-600">{item.schedule}</p>
        </div>
      ))}
    </div>
  );
}
