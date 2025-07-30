import React, { useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import AddAvailableModal from "./AddAvailableModal";
import AvailableSummary from "./AvailableSummary";
import { fetchSchedules, submitSchedule, deleteSchedule } from "@/utils/api";

export default function AvailableSection() {
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSchedules = async () => {
    setLoading(true);
    try {
      const schedules = await fetchSchedules();
      setAvailableDates(schedules);
    } catch (err) {
      console.error("❌ Gagal ambil jadwal:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDate = async (date) => {
    try {
      await submitSchedule(date);
      loadSchedules();
    } catch (err) {
      alert("Gagal menambahkan jadwal.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      loadSchedules();
    } catch (err) {
      alert("Gagal menghapus jadwal.");
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  // const handleAddDate = async (newDate) => {
  //   if (!availableDates.includes(newDate)) {
  //     try {
  //       await submitSchedule(newDate);
  //       setAvailableDates([...availableDates, newDate]);
  //     } catch (err) {
  //       alert("Gagal menyimpan jadwal ke server.");
  //     }
  //   }
  // };

  // const handleDeleteDate = (dateToRemove) => {
  //   setAvailableDates(availableDates.filter((d) => d !== dateToRemove));
  // };

  return (
    <div className="space-y-2 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Jadwal Ketersediaan</h2>
        <div className="flex justify-end">
          <AddAvailableModal
            onAddDate={handleAddDate}
            existingDates={availableDates}
          />
        </div>
      </div>
      <Separator />
      <AvailableSummary
        availableDates={availableDates}
        loading={loading}

        // onDeleteDate={handleDeleteDate}
      />
    </div>
  );
}
