import LoaderScreen from '@/components/global/LoaderScreen';
import { Button } from '@/components/ui/button';
import useInitialData from '@/hooks/useInitialData';
import { getAllRequests } from '@/utils/local-data';
import React from 'react';

export default function CaregiverConfirmRequest() {
  const { initializing, data: requests } = useInitialData(() => getAllRequests());

  if (initializing) return <LoaderScreen message={'Mengambil semua permintaan....'} />;

  return (
    <>
      {requests.map((request, index) => {
        return <RequestCard request={request} key={index} />;
      })}
    </>
  );
}

function RequestCard({ request }) {
  const { name, address, date } = request;
  return (
    <div className="space-y-2 rounded-lg py-4 px-7 shadow flex items-center justify-between hover:bg-muted/40 transition">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{address}</p>
      </div>
      <div className="flex items-center gap-8">
        <span className="font-medium">{date}</span>
        <div className="flex gap-2">
          <Button className="bg-[#AEF482] hover:bg-green-600 text-black hover:text-white cursor-pointer">
            Terima
          </Button>
          <Button className="bg-[#F48282] hover:bg-red-600 text-black hover:text-white cursor-pointer">
            Tolak
          </Button>
        </div>
      </div>
    </div>
  );
}
