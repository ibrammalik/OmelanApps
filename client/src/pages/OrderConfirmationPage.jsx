import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  UserIcon,
  UserCircleIcon,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const caregiver = location.state?.caregiver;
  const appointmentDate = location.state?.selectedDate;

  const [userName, setUserName] = useState("-");
  const [loading, setLoading] = useState(false);

  const formattedDate = new Date(appointmentDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Decode JWT token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserName(decoded.fullname || "-");
        console.log(decoded);
      } catch (err) {
        console.error("Gagal mendecode token:", err);
      }
    }
  }, []);

  if (!caregiver || !appointmentDate) {
    return (
      <div>Data tidak lengkap. Silakan pilih caregiver dan tanggal ulang.</div>
    );
  }

  const handleConfirmAppointment = async () => {
    const accessToken = localStorage.getItem("accessToken");

    setLoading(true);
    try {
      console.log("Payload ke backend:", {
        userPartnerId: caregiver.id,
        appointmentDate,
      });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userPartnerId: caregiver.id,
          appointmentDate,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Gagal membuat appointment");
        return;
      }

      alert("Appointment berhasil dibuat!");
      navigate("/dashboard/caretaker/appointment");
    } catch (err) {
      console.error("Error saat membuat appointment:", err);
      alert("Terjadi kesalahan saat memproses appointment.");
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
              Nama: <strong>{userName}</strong>
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
              Tanggal Perawatan: <strong>{formattedDate}</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-lg font-semibold">
          Perawat yang Dipilih
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <img
            src={caregiver.photo_url}
            alt="caregiver"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{caregiver.fullname}</p>
            <p className="text-sm text-muted-foreground">
              Spesialis: {caregiver.specialist}
            </p>
            <p className="text-sm text-muted-foreground">
              Pengalaman: {caregiver.experience}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-lg font-semibold">
          Detail Pemesanan
        </CardHeader>
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

        <Button
          className="bg-primary text-white hover:bg-primary/90"
          onClick={handleConfirmAppointment}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Konfirmasi & Pesan"}
        </Button>
      </div>
    </div>
  );
}
