import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !text) {
      toast.error('Harap isi rating dan ulasan.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      rating,
      text,
    };

    onSubmit?.(newReview);

    toast.success('Ulasan berhasil dikirim!');

    setRating(0);
    setHoverRating(0);
    setText('');
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
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Ulasan</label>
        <textarea
          placeholder="Tulis ulasan Anda di sini..."
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 justify-end">
          Kirim Ulasan
        </Button>
      </div>
    </form>
  );
}
