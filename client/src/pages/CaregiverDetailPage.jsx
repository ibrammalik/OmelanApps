import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useInitialData from '@/hooks/useInitialData';
import { getCaregiverDetailsById } from '@/utils/local-data';
import LoaderScreen from '@/components/global/LoaderScreen';

export default function CaregiverDetailPage() {
  const { id } = useParams();
  const { initializing, data: caregiver } = useInitialData(() => getCaregiverDetailsById(id));

  if (initializing) return <LoaderScreen message={'Mengambil detail caregiver....'} />;
  // if (!caregiver) return <NotFoundPage />;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      {/* Header */}
      <Card className="flex flex-col md:flex-row items-start gap-6 p-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={caregiver.photo_url} />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{caregiver.fullname}</h2>
          <p className="text-muted-foreground">Usia {caregiver.age} tahun</p>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-sm">{caregiver.average_rating} / 5.0</span>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            <Badge variant="outline">{caregiver.experience} pengalaman</Badge>
            <Badge variant="secondary">{caregiver.specialist}</Badge>
          </div>
        </div>
      </Card>

      {/* Biodata Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tentang Perawat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Perawat berpengalaman yang telah membantu puluhan pasien lansia dalam merawat kebutuhan
            harian mereka, dengan pendekatan empati dan profesional.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { CalendarCheck, MapPin, Stethoscope } from 'lucide-react';

// export default function CaregiverDetailPage() {
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
//       {/* Header */}
//       <Card>
//         <CardHeader className="flex items-center gap-4">
//           <Avatar className="w-20 h-20">
//             <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" />
//             <AvatarFallback>AN</AvatarFallback>
//           </Avatar>
//           <div>
//             <CardTitle className="text-2xl font-semibold">Anisa Putri</CardTitle>
//             <p className="text-muted-foreground text-sm">Perawat Profesional</p>
//             <div className="mt-2 flex gap-2">
//               <Badge variant="outline">
//                 <Stethoscope className="w-4 h-4 mr-1" />
//                 Tersertifikasi
//               </Badge>
//               <Badge variant="secondary">4+ tahun pengalaman</Badge>
//             </div>
//           </div>
//         </CardHeader>

//         {/* Content */}
//         <CardContent className="space-y-4 text-sm leading-relaxed">
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <MapPin className="w-4 h-4" />
//             Jakarta Selatan, Indonesia
//           </div>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <CalendarCheck className="w-4 h-4" />
//             Tersedia: Senin - Sabtu
//           </div>
//           <p>
//             Anisa adalah perawat berpengalaman dalam perawatan lansia, dengan fokus pada kenyamanan
//             pasien, komunikasi keluarga, dan kebersihan pribadi. Memiliki pelatihan khusus untuk
//             pasien dengan demensia ringan.
//           </p>
//         </CardContent>

//         {/* Footer */}
//         <CardFooter className="flex justify-between">
//           <div>
//             <p className="text-sm text-muted-foreground">Biaya per kunjungan</p>
//             <p className="text-lg font-semibold text-primary">Rp 150.000</p>
//           </div>
//           <Button size="lg">Pilih Perawat</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
