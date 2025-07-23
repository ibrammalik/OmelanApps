import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, UserIcon, UserCircleIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      <h2 className="text-2xl font-bold">Konfirmasi Pemesanan</h2>

      <Card>
        <CardHeader className="text-lg font-semibold">Data Pasien</CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3">
            <UserIcon className="w-5 h-5" />
            <p>
              Nama: <strong>Andi Wijaya</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UserCircleIcon className="w-5 h-5" />
            <p>
              Usia: <strong>76 Tahun</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5" />
            <p>
              Tanggal Perawatan: <strong>25 Juli 2025</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-lg font-semibold">Perawat yang Dipilih</CardHeader>
        <CardContent className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="caregiver"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">Siti Rahmawati</p>
            <p className="text-sm text-muted-foreground">Spesialis: Lansia dengan Demensia</p>
            <p className="text-sm text-muted-foreground">Pengalaman: 4 tahun</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-lg font-semibold">Detail Pemesanan</CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Durasi Layanan</span>
            <span>1 Hari</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Perawat</span>
            <span>Rp 350.000</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rp 350.000</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Link to="/dashboard">
          <Button className="bg-primary text-white hover:bg-primary/90">Konfirmasi & Pesan</Button>
        </Link>
      </div>
    </div>
  );
}
