import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CaregiverAvailable({
  onClose,
  onSubmit,
  existingDates = [],
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!selectedDate) return;

    if (existingDates.includes(selectedDate)) {
      setError("Tanggal sudah dipilih sebelumnya.");
      return;
    }

    if (onSubmit) {
      onSubmit(selectedDate);
      setSelectedDate("");
      setError("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Atur Jadwal Ketersediaan</h2>
      <Separator />
      <div className="grid gap-2">
        <Label htmlFor="date" className="mb-2 font-medium">
          Pilih Tanggal
        </Label>
        <Input
          id="date"
          type="date"
          min={getTodayDate()}
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setError("");
          }}
          required
        />
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} className="cursor-pointer">
          Batal
        </Button>
        <Button className="cursor-pointer" onClick={handleSubmit}>
          Simpan
        </Button>
      </div>
    </div>
  );
}
