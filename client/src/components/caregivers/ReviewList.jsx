import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ExpandableText from "../ExpandableText";
import StarRating from "../StarRating";
import { getReviewsForPartner } from "../../utils/api";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const reviews = [
  //   {
  //     id: 1,
  //     name: "Bambang",
  //     date: "22 July 2025",
  //     rating: 4,
  //     text: "Aplikasi pencatat ini menghadirkan antarmuka yang minimalis namun sangat fungsional, cocok bagi pengguna yang mengutamakan efisiensi dan produktivitas. Pengalaman pengguna terasa intuitif, dengan fitur utama seperti penambahan catatan, pengelompokan berdasarkan kategori, serta kemampuan menyematkan catatan penting agar mudah diakses.",
  //   },
  //   {
  //     id: 2,
  //     name: "Siti",
  //     date: "21 July 2025",
  //     rating: 5,
  //     text: "Sangat membantu saya dalam mengatur jadwal harian. UI-nya simpel dan mudah dipahami. Saya harap ke depan ada fitur kolaborasi juga.",
  //   },
  // ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsForPartner();
        console.log(data);

        setReviews(data);
      } catch (err) {
        console.error("Gagal memuat review partner:", err);
        setError("Gagal memuat review.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="space-y-2 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Penilaian & Ulasan</h2>
      </div>
      <Separator />
      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Belum ada penilaian dan ulasan.
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.appointment_id}
            className="flex gap-4 items-center mt-4 border p-4 rounded-lg"
          >
            <div className="flex items-center shrink-0">
              <Avatar className="w-12 h-12 rounded-lg overflow-hidden">
                {review.photo_url ? (
                  <img
                    src={review.photo_url}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-lg font-medium bg-blue-100 text-blue-700">
                    {review.name?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-base font-semibold truncate">
                  {review.client_name}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  {new Date(review.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <StarRating rating={review.rating} />
              <ExpandableText text={review.comment} maxLength={200} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
