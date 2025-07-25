import { Clock4, SquarePen, Trash2 } from "lucide-react";
import { days } from "@/utils/time-slots";

export default function AvailabilitySummary({
  availability,
  onRemoveDay,
  onEditDay,
}) {
  if (Object.keys(availability).length === 0) {
    return <p className="text-muted-foreground">Belum ada jadwal.</p>;
  }

  return (
    <div className="space-y-4">
      {Object.entries(availability)
        .sort(([dayA], [dayB]) => days.indexOf(dayA) - days.indexOf(dayB))
        .map(([day, slots]) => (
          <div key={day} className="border rounded-lg p-3">
            <div className="flex justify-between items-center p-2">
              <p className="font-medium">{day}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditDay(day)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Slots"
                >
                  <SquarePen className="cursor-pointer" size={16} />
                </button>
                <button
                  onClick={() => onRemoveDay(day)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove Slots"
                >
                  <Trash2 className="cursor-pointer" size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 p-2">
              {slots.map((slot, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 p-2 rounded text-sm flex gap-2 items-center"
                >
                  <Clock4 size={16} />
                  {slot}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
