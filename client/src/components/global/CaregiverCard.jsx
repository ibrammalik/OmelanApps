// components/CaregiverCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaregiverCard({ caregiver }) {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md py-0 gap-0">
      <CardHeader className="p-0">
        <img
          src={caregiver.photo_url}
          alt={caregiver.fullname}
          className="h-48 w-full object-cover rounded-t-2xl"
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold">
          <Link to={`/caregivers/${caregiver.id}`}>{caregiver.fullname}</Link>
        </CardTitle>
        <p className="text-sm text-gray-500">{caregiver.specialist}</p>
        <p className="text-sm text-muted-foreground">{caregiver.address}</p>
        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
          <Star size={16} className="fill-yellow-400 stroke-yellow-500" />
          {caregiver.average_rating || 'Belum ada rating'}
        </div>
      </CardContent>
    </Card>
  );
}
