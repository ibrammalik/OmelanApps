import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DatePicker } from '@/components/order-page/DatePicker';
import { Link } from 'react-router-dom';
import { CaregiverDetailModal } from '@/components/order-page/CaregiverDetailModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CaregiverOrderPage() {
  const [date, setDate] = useState();
  const [showAvailable, setShowAvailable] = useState(false);

  const handleSearch = () => {
    if (date) {
      setShowAvailable(true);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="text-center mb-4">
        <div className="dark:border relative overflow-hidden w-full dark bg-background text-foreground max-w-screen-lg mx-auto rounded-2xl py-10 md:py-16 px-6 md:px-14">
          <div className="relative z-0 flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold">Pesan Caregiver</h1>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pilih Tanggal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DatePicker date={date} setDate={setDate} />
          <Button onClick={handleSearch} className="w-full mt-2">
            Cari Caregiver Tersedia
          </Button>
        </CardContent>
      </Card>

      {showAvailable && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Caregiver Tersedia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dummy nurse list (bisa diganti dengan fetch dari API) */}
            {[1, 2, 3].map((id) => (
              <div key={id} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Siti Nurhaliza</p>
                    <p className="text-sm text-muted-foreground">
                      Berpengalaman 5+ tahun merawat lansia
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CaregiverDetailModal />
                  <Link to="/konfirmasi-pesanan">
                    <Button variant="outline">Pilih</Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
