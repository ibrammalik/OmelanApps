import React from "react";

export default function ReviewSummary({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex justify-between shadow p-2 rounded-lg items-center"
        >
          <div className="px-1">
            <p className="font-semibold mb-2">{review.caretakerName}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          <p className="text-sm text-gray-700 px-1">{review.feedback}</p>
        </div>
      ))}
    </div>
  );
}
