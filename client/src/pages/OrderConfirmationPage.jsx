import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, UserIcon, UserCircleIcon, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const caregiver = location.state?.caregiver;
  const appointmentDate = location.state?.selectedDate;
  const [loading, setLoading] = useState(false);

  const formattedDate = new Date(appointmentDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/details/client`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await res.json();

        if (res.ok) {
          setUser(result.data.details);
        } else {
          // console.error("Gagal memuat data user:", result.message);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        // console.error("Error mengambil user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!caregiver || !appointmentDate) {
    return <div>Data tidak lengkap. Silakan pilih caregiver dan tanggal ulang.</div>;
  }

  const handleConfirmAppointment = async () => {
    const accessToken = localStorage.getItem('accessToken');

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userPartnerId: caregiver.id,
          duration: 1,
          scheduleId: caregiver.schedule_id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || 'Gagal membuat appointment');
        return;
      }

      alert('Appointment berhasil dibuat!');
      navigate('/dashboard/caretaker/appointment');
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // console.error("Error saat membuat appointment:", err);
      alert('Terjadi kesalahan saat memproses appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      <h2 className="text-2xl font-bold">Konfirmasi Pemesanan</h2>

      <Card>
        <CardHeader className="text-lg font-semibold">Data Pasien</CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3">
            <UserIcon className="w-5 h-5" />
            <p>
              Nama: <strong>{user?.fullname}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UserCircleIcon className="w-5 h-5" />
            <p>
              Usia: <strong>{user?.age || '-'}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5" />
            <p>
              Tanggal Perawatan: <strong>{formattedDate}</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-lg font-semibold">Perawat yang Dipilih</CardHeader>
        <CardContent className="flex items-center gap-4">
          <img
            src={caregiver.photo_url}
            alt="caregiver"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{caregiver.fullname}</p>
            <p className="text-sm text-muted-foreground">
              Spesialis: {caregiver.specialist || '-'}
            </p>
            <p className="text-sm text-muted-foreground">
              Pengalaman: {caregiver.experience || '-'}
            </p>
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
            <span>Rp {caregiver.rate_per_hour || '350.000'}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rp {caregiver.rate_per_hour || '350.000'}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <Button
          className="bg-primary text-white hover:bg-primary/90"
          onClick={handleConfirmAppointment}
          disabled={loading}>
          {loading ? 'Memproses...' : 'Konfirmasi & Pesan'}
        </Button>
      </div>
    </div>
  );
}
