import React from 'react';
import CaregiverCard from '@/components/global/CaregiverCard';
import { getAllCaregivers } from '@/utils/local-data';
import useInitialData from '@/hooks/useInitialData';
import LoaderScreen from '@/components/global/LoaderScreen';

export default function CaregiverListPage() {
  const { initializing, data: caregivers } = useInitialData(() => getAllCaregivers());

  if (initializing) return <LoaderScreen message={'Mengambil daftar caregiver....'} />;

  return (
    <section className="px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Daftar Caregiver</h1>

      {caregivers.length === 0 ? (
        <p className="text-center text-muted-foreground">Tidak ada caregiver ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {caregivers.map((caregiver) => (
            <CaregiverCard key={caregiver.id} caregiver={caregiver} />
          ))}
        </div>
      )}
    </section>
  );
}
