import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Check, MapPin, Calendar, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trip } from '@/types';
import { format } from 'date-fns';

interface ShareReelSheetProps {
  isOpen: boolean;
  onClose: () => void;
  trips: Trip[];
  reelData: {
    url: string;
    thumbnail: string;
    platform: 'instagram' | 'tiktok';
  };
}

export const ShareReelSheet = ({ isOpen, onClose, trips, reelData }: ShareReelSheetProps) => {
  const navigate = useNavigate();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedTripId) return;
    // Navigate to AddReel with the selected trip and reel data
    navigate(`/trip/${selectedTripId}/add-reel`, { 
      state: { 
        reelUrl: reelData.url,
        thumbnail: reelData.thumbnail,
        platform: reelData.platform,
        fromShare: true 
      } 
    });
    onClose();
  };

  const getPlatformBadge = () => {
    if (reelData.platform === 'instagram') {
      return (
        <span className="absolute top-2 left-2 w-6 h-6 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
          IG
        </span>
      );
    }
    return (
      <span className="absolute top-2 left-2 w-6 h-6 rounded bg-black flex items-center justify-center text-white text-xs font-bold shadow-lg">
        TT
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h2 className="text-xl font-bold text-foreground">Agregar a viaje</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Reel Preview */}
            <div className="px-6 mb-6">
              <div className="flex gap-4 p-4 bg-muted rounded-2xl">
                {/* Thumbnail */}
                <div className="relative w-20 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={reelData.thumbnail} 
                    alt="Reel preview" 
                    className="w-full h-full object-cover"
                  />
                  {getPlatformBadge()}
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {reelData.platform === 'instagram' ? 'Instagram Reel' : 'TikTok'}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {reelData.url}
                  </p>
                </div>
              </div>
            </div>

            {/* Trip Selection */}
            <div className="px-6 pb-4">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Selecciona un viaje
              </p>
            </div>

            <div className="px-6 overflow-y-auto max-h-[40vh] pb-6 space-y-3">
              {trips.map((trip) => (
                <motion.button
                  key={trip.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTripId(trip.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    selectedTripId === trip.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted border-2 border-transparent'
                  }`}
                >
                  {/* Trip Image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={trip.coverImage} 
                      alt={trip.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Trip Info */}
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">{trip.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {trip.destination}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(trip.startDate), 'MMM d')}
                      </span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTripId === trip.id
                      ? 'bg-primary border-primary'
                      : 'border-muted-foreground/30'
                  }`}>
                    {selectedTripId === trip.id && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Confirm Button */}
            <div className="px-6 pb-8 pt-2 border-t border-border">
              <Button
                variant="sunset"
                size="lg"
                className="w-full"
                disabled={!selectedTripId}
                onClick={handleConfirm}
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
