import { CalendarCheck, History, MapPin, ShieldCheck, User, Users } from 'lucide-react';
import React from 'react';

const features = [
  {
    title: 'Perawat Tersertifikasi',
    description:
      'Semua perawat telah melalui proses verifikasi dan memiliki sertifikasi profesional di bidangnya.',
    icon: ShieldCheck,
  },
  {
    title: 'Pemesanan untuk Diri Sendiri atau Keluarga',
    description:
      'Anda bisa memesan layanan untuk diri sendiri atau keluarga, cukup isi data pasien yang dibutuhkan.',
    icon: Users,
  },
  {
    title: 'Jadwal Harian yang Fleksibel',
    description: 'Perawat tersedia setiap hari, dan Anda bebas memilih tanggal sesuai kebutuhan.',
    icon: CalendarCheck,
  },
  {
    title: 'Berbasis Lokasi',
    description: 'Temukan perawat terdekat dari lokasi Anda untuk kemudahan dan efisiensi waktu.',
    icon: MapPin,
  },
  {
    title: 'Riwayat Pemesanan',
    description: 'Lihat kembali catatan pemesanan sebelumnya dengan mudah di aplikasi.',
    icon: History,
  },
  {
    title: 'Profil Perawat Lengkap',
    description: 'Setiap perawat memiliki profil yang dapat Anda baca sebelum melakukan pemesanan.',
    icon: User,
  },
];

const Features = () => {
  return (
    <div id="fitur" className="w-full py-12 xs:py-20 px-6 scroll-mt-16 bg-muted">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Kenapa Memilih Omelan?
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5">
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
