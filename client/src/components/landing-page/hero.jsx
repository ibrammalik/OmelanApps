import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            Pesan Layanan Caregiver Harian dengan Mudah
          </h1>
          <p className="mt-6 xs:text-lg">
            Temukan caregiver profesional dan terpercaya hanya dalam beberapa klik. Untuk Anda atau
            keluarga tercinta.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full text-base">
              <NavLink to="/pesan" end>
                Pesan Sekarang
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
