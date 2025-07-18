import * as React from 'react';
import { Calendar1Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function formatDate(date) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function DatePicker({ date, setDate }) {
  const [open, setOpen] = React.useState(false);

  // Hitung tanggal besok
  const tomorrow = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-between font-normal">
              {date ? formatDate(date) : 'Pilih tanggal'}
              <Calendar1Icon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                if (selectedDate && selectedDate >= tomorrow) {
                  setDate(selectedDate);
                  setOpen(false);
                }
              }}
              disabled={(date) => date < tomorrow}
            />
          </PopoverContent>
        </Popover>
      </div>
      {date && (
        <div className="text-muted-foreground px-1 text-sm">
          Mencari caregiver tersedia pada tanggal{' '}
          <span className="font-medium">{formatDate(date)}</span>.
        </div>
      )}
    </div>
  );
}
