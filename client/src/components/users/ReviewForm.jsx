import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { updateReview } from "../../utils/api";

export default function ReviewForm({
  appointmentId,
  defaultRating,
  defaultComment,
  onSubmit,
}) {
  const [rating, setRating] = useState(defaultRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(defaultComment || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Harap isi rating dan ulasan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateReview({ appointmentId, rating, comment });
      toast.success("Ulasan berhasil dikirim!");
      onSubmit();
    } catch (err) {
      setError("Gagal mengirim review.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-lg p-2 bg-white">
      <h2 className="text-lg font-semibold">Beri Penilaian</h2>
      <Separator />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Rating</label>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-6 h-6 cursor-pointer ${
                (hoverRating || rating) >= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium text-sm">Ulasan:</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Kirim Review"}
      </Button>
    </form>
  );
}
