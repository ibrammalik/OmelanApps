import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import CaregiverCard from '../global/CaregiverCard';
import LoaderScreen from '../global/LoaderScreen';

export default function CaregiverListSection({ caregivers, initializing }) {
  if (initializing)
    return (
      <div className="py-4">
        <LoaderScreen message={'Mengambil daftar caregiver....'} />
      </div>
    );

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Perawat Pilihan Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caregivers.map((caregiver) => (
            <CaregiverCard key={caregiver.id} caregiver={caregiver} />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <NavLink to="/caregivers" end>
            Lihat Semua Perawat
          </NavLink>
        </Button>
      </div>
    </section>
  );
}
