import React from "react";

export default function StatCard({
  title,
  value,
  icon: IconComponent,
  iconColor = "text-gray-300",
}) {
  return (
    <div className="rounded-lg bg-white shadow p-4 text-start flex justify-between">
      <div>
        <p className="text-sm font-semibold mb-3">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {IconComponent && <IconComponent size={48} className={iconColor} />}
    </div>
  );
}
