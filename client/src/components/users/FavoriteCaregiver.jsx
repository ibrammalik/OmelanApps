import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFavoriteCaregivers } from "@/hooks/useFavoriteCaregivers";
import { Star } from "lucide-react";

export default function FavoriteCaregiver() {
  const { favorites, toggleFavorite } = useFavoriteCaregivers();

  return (
    <div className="rounded-xl bg-white p-6 shadow-md space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Pengasuh Favorit</h2>
      <Separator />

      {favorites.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Belum ada caregiver favorit.
        </p>
      ) : (
        <div className="space-y-4">
          {favorites.map((caregiver) => (
            <div
              key={caregiver.id}
              className="flex items-center justify-between border p-4 rounded-lg hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 rounded-lg">
                  <AvatarFallback className="text-blue-700 font-bold text-lg">
                    {caregiver.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{caregiver.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {caregiver.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(caregiver)}
                >
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </Button>
                <Button variant="outline">Buat Jadwal</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
