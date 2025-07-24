import React, { useState } from "react";

export default function ExpandableText({
  text,
  items,
  maxVisible = 10,
  maxLength = 200,
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  if (items) {
    const visibleItems = expanded ? items : items.slice(0, maxVisible);
    return (
      <div className="flex flex-wrap gap-2">
        {visibleItems.map((item, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full border"
          >
            {item}
          </span>
        ))}
        {items.length > maxVisible && (
          <button
            onClick={toggleExpanded}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {expanded ? "Lihat lebih sedikit." : "Lihat selengkapnya."}
          </button>
        )}
      </div>
    );
  }

  if (text) {
    return (
      <p className="text-md text-gray-800 text-justify">
        <span>{expanded ? text : `${text.substring(0, maxLength)}...`}</span>{" "}
        {text.length > maxLength && (
          <button
            onClick={toggleExpanded}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {expanded ? "Lihat lebih sedikit." : "Lihat selengkapnya."}
          </button>
        )}
      </p>
    );
  }

  return null;
}
