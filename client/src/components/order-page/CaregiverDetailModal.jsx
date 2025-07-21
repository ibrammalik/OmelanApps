import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CaregiverDetailModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Lihat Detail</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Detail Perawat</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <Card className="flex flex-col md:flex-row items-start gap-6 p-6">
            <Avatar className="w-28 h-28">
              <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold">Nama Perawat</h2>
              <p className="text-muted-foreground">Usia 45 tahun</p>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">4.8 / 5.0</span>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                <Badge variant="outline">8 tahun pengalaman</Badge>
                <Badge variant="secondary">Lansia & Demensia</Badge>
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
                Perawat berpengalaman yang telah membantu puluhan pasien lansia dalam merawat
                kebutuhan harian mereka, dengan pendekatan empati dan profesional.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex justify-end">
            <Link to="/konfirmasi-pesanan">
              <Button size="lg">Pesan Perawat Ini</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
