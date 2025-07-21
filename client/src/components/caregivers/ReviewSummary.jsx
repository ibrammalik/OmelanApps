import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

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
          className="flex justify-between shadow p-4 rounded-lg items-center"
        >
          <div className="flex justify-between items-center gap-2">
            <Avatar className="w-12 h-12 rounded-lg">
              <AvatarFallback className="rounded-lg">O</AvatarFallback>
            </Avatar>
            <div className="px-1">
              <p className="font-semibold mb-2">{review.caretakerName}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 px-1">{review.feedback}</p>
        </div>
      ))}
    </div>
  );
}
