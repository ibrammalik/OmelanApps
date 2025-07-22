import React from "react";

export default function AvailabilityList({ availability = {} }) {
  const hasAvailability = Object.keys(availability).length > 0;

  if (!hasAvailability) {
    return <p className="text-gray-500">No availability set.</p>;
  }

  return (
    <div className="space-y-4">
      {Object.entries(availability).map(([day, times]) => (
        <div key={day} className="rounded-lg flex justify-between">
          <p className="font-semibold capitalize">{day}</p>
          {times.length > 0 ? (
            <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 list-none">
              {times.map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No time slots available.</p>
          )}
        </div>
      ))}
    </div>
  );
}
