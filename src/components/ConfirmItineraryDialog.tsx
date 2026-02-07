import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon, Sparkles, X, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const PLACEHOLDER_NAMES = [
  'Day 1 — Exploring',
  'First Day Adventure',
  'Morning to Night',
  'The Grand Tour',
  'Hidden Gems Day',
  'Local Favorites',
];

interface ConfirmItineraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name?: string, date?: Date) => void;
  defaultTitle?: string;
}

export const ConfirmItineraryDialog = ({
  open,
  onOpenChange,
  onConfirm,
  defaultTitle,
}: ConfirmItineraryDialogProps) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [placeholder] = useState(
    () => PLACEHOLDER_NAMES[Math.floor(Math.random() * PLACEHOLDER_NAMES.length)]
  );

  const handleConfirm = () => {
    onConfirm(name.trim() || undefined, date);
    setName('');
    setDate(undefined);
  };

  const handleSkip = () => {
    onConfirm();
    setName('');
    setDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-none shadow-float max-w-sm mx-auto p-0 overflow-hidden">
        {/* Header accent */}
        <div className="gradient-sunset p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-extrabold text-white">
                Itinerary ready!
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm mt-0.5">
                Customize it or skip for now
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Name input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Name your itinerary
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={placeholder}
              className="h-12 rounded-2xl"
            />
            <p className="text-xs text-muted-foreground">
              Give it a memorable name, or leave blank to keep "{defaultTitle}"
            </p>
          </div>

          {/* Date picker */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              When are you going?
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full h-12 justify-start text-left font-normal rounded-2xl border-2',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date (optional)'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className={cn('p-3 pointer-events-auto')}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              className="w-full py-3.5 rounded-2xl gradient-sunset text-white font-bold text-sm flex items-center justify-center gap-2 shadow-soft"
            >
              <Check className="w-4 h-4" />
              Confirm Itinerary
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSkip}
              className="w-full py-3 rounded-2xl text-muted-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              Skip for now
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
