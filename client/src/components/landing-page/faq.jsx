import { CalendarDays, CreditCard, MapPin, Repeat2, ShieldCheck, UsersRound } from 'lucide-react';

const faq = [
  {
    icon: <UsersRound />,
    question: 'Apakah saya bisa memesan perawat untuk orang tua saya?',
    answer:
      'Tentu saja. Anda dapat mengisi data pasien atas nama orang tua atau anggota keluarga lainnya saat melakukan pemesanan.',
  },
  {
    icon: <CalendarDays />,
    question: 'Bagaimana jika tidak ada perawat yang tersedia di tanggal yang saya pilih?',
    answer:
      'Jika tidak tersedia, sistem akan merekomendasikan tanggal alternatif atau perawat lain yang masih dalam jangkauan.',
  },
  {
    icon: <Repeat2 />,
    question: 'Apakah saya bisa memilih perawat yang sama lagi di kemudian hari?',
    answer:
      'Ya, Anda bisa melihat riwayat pemesanan dan memesan ulang perawat yang sebelumnya pernah memberikan layanan.',
  },
  {
    icon: <MapPin />,
    question: 'Apakah layanan tersedia di luar kota?',
    answer:
      'Saat ini layanan Omelan tersedia di beberapa kota besar di Indonesia. Gunakan pencarian lokasi untuk melihat cakupan area.',
  },
  {
    icon: <ShieldCheck />,
    question: 'Apakah data pribadi saya aman?',
    answer:
      'Kami menjamin keamanan dan kerahasiaan data Anda menggunakan sistem enkripsi dan standar perlindungan data yang ketat.',
  },
  {
    icon: <CreditCard />,
    question: 'Metode pembayaran apa yang bisa digunakan?',
    answer:
      'Kami mendukung pembayaran melalui transfer bank, e-wallet (seperti OVO, Dana, Gopay), serta kartu debit dan kredit.',
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-20 scroll-mt-16 bg-muted">
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Kami telah mengumpulkan pertanyaan yang sering diajukan seputar layanan Omelan. Temukan
          jawaban cepat di bawah ini.
        </p>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                {icon}
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
