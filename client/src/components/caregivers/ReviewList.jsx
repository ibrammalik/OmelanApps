import React from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ExpandableText from "../ExpandableText";
import StarRating from "../StarRating";

export default function ReviewList() {
  const reviews = [
    {
      id: 1,
      name: "Bambang",
      date: "22 July 2025",
      rating: 4,
      text: "Aplikasi pencatat ini menghadirkan antarmuka yang minimalis namun sangat fungsional, cocok bagi pengguna yang mengutamakan efisiensi dan produktivitas. Pengalaman pengguna terasa intuitif, dengan fitur utama seperti penambahan catatan, pengelompokan berdasarkan kategori, serta kemampuan menyematkan catatan penting agar mudah diakses.",
    },
    {
      id: 2,
      name: "Siti",
      date: "21 July 2025",
      rating: 5,
      text: "Sangat membantu saya dalam mengatur jadwal harian. UI-nya simpel dan mudah dipahami. Saya harap ke depan ada fitur kolaborasi juga.",
    },
  ];

  return (
    <div className="space-y-2 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Penilaian & Ulasan</h2>
      </div>
      <Separator />
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex gap-4 items-center mt-4 border p-4 rounded-lg"
        >
          <div className="flex items-center shrink-0">
            <Avatar className="w-12 h-12 rounded-lg">
              <AvatarFallback className="text-lg font-medium bg-blue-100 text-blue-700">
                {review.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-base font-semibold truncate">{review.name}</p>
              <p className="text-sm text-gray-600 text-center">{review.date}</p>
            </div>
            <StarRating rating={review.rating} />
            <ExpandableText text={review.text} maxLength={200} />
          </div>
        </div>
      ))}
    </div>
  );
}
