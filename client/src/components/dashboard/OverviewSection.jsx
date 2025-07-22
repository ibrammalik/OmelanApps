import React from "react";
import AppointmentList from "../caregivers/AppointmentList";
import AvailabilityList from "../caregivers/AvailabilityList";
import { Link } from "react-router-dom";

export default function OverviewSection({ appointments, availability }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="shadow p-4 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-base font-semibold mb-4">Appointment Lists</h2>
            <Link className="text-gray-600">View all</Link>
          </div>
          <AppointmentList appointments={appointments} />
        </section>

        <section className="shadow p-4 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-base font-semibold mb-4">Availability</h2>
            <Link className="text-gray-600">Set</Link>
          </div>
          <AvailabilityList availability={availability} />
        </section>
      </div>
    </div>
  );
}
