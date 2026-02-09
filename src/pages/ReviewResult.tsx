import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReelProcessingResult, Itinerary, TripTemplate } from '@/types';
import {
  ArrowLeft, Check, Trash2, MapPin, Clock,
  Calendar, Compass, Sparkles, Route
} from 'lucide-react';
import { CategoryBadge } from '@/components/CategoryBadge';

interface LocationState {
  result: ReelProcessingResult;
  tripId: string;
}

const REEL_TYPE_LABELS: Record<string, { label: string; description: string; icon: typeof Sparkles }> = {
  'single-day': { label: '1 día detectado', description: 'Se generó un itinerario completo', icon: Calendar },
  'multi-day': { label: 'Multi-día detectado', description: 'Se generaron múltiples itinerarios', icon: Route },
  'destination-guide': { label: 'Guía de destinos', description: 'Se creó un plan de viaje con etapas', icon: Compass },
};

const ReviewResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const result = state?.result;
  const tripId = state?.tripId || '';

  const [itineraries, setItineraries] = useState<Itinerary[]>(result?.itineraries || []);
  const [template, setTemplate] = useState<TripTemplate | null>(result?.template || null);

  if (!result) {
    navigate('/home');
    return null;
  }

  const typeInfo = REEL_TYPE_LABELS[result.reelType];

  const removeItinerary = (id: string) => {
    setItineraries((prev) => prev.filter((it) => it.id !== id));
  };

  const removeDestination = (id: string) => {
    if (!template) return;
    setTemplate({
      ...template,
      destinations: template.destinations.filter((d) => d.id !== id),
    });
  };

  const handleConfirm = () => {
    if (result.reelType === 'destination-guide') {
      navigate(`/trip/${tripId}`);
    } else if (itineraries.length === 1) {
      navigate(`/itinerary/${itineraries[0].id}`);
    } else {
      navigate(`/trip/${tripId}`);
    }
  };

  const totalItems = result.reelType === 'destination-guide'
    ? template?.destinations.length || 0
    : itineraries.length;

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 safe-top flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h1 className="text-xl font-bold text-foreground">Review Result</h1>
      </div>

      {/* Type badge */}
      <div className="px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10"
        >
          <div className="w-10 h-10 rounded-xl gradient-sunset flex items-center justify-center flex-shrink-0">
            <typeInfo.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">{typeInfo.label}</p>
            <p className="text-xs text-muted-foreground">{typeInfo.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        {result.reelType === 'destination-guide' && template ? (
          <TemplateReview template={template} onRemove={removeDestination} />
        ) : (
          <ItinerariesReview itineraries={itineraries} onRemove={removeItinerary} />
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 pt-4 border-t border-border bg-background">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            {totalItems} {result.reelType === 'destination-guide' ? 'destinos' : 'itinerarios'}
          </p>
          <p className="text-xs text-muted-foreground">Podés editar después</p>
        </div>
        <Button
          variant="sunset"
          size="lg"
          className="w-full"
          onClick={handleConfirm}
          disabled={totalItems === 0}
        >
          <Check className="w-4 h-4" />
          Confirmar y agregar
        </Button>
      </div>
    </div>
  );
};

/** Review list of itineraries (single-day or multi-day) */
const ItinerariesReview = ({
  itineraries,
  onRemove,
}: {
  itineraries: Itinerary[];
  onRemove: (id: string) => void;
}) => (
  <div className="space-y-4">
    <AnimatePresence>
      {itineraries.map((itinerary, index) => (
        <motion.div
          key={itinerary.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100, height: 0 }}
          transition={{ delay: index * 0.08 }}
          className="glass rounded-2xl overflow-hidden shadow-card"
        >
          {/* Day header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-extrabold text-primary">
                  {itinerary.dayNumber || index + 1}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">{itinerary.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{itinerary.city}</span>
                  <span>·</span>
                  <Clock className="w-3 h-3" />
                  <span>{itinerary.totalTime}</span>
                </div>
              </div>
            </div>
            {itineraries.length > 1 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(itinerary.id)}
                className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </motion.button>
            )}
          </div>

          {/* Stops preview */}
          <div className="px-4 pb-4">
            <div className="space-y-2">
              {itinerary.stops.map((stop, si) => (
                <div key={stop.id} className="flex items-center gap-3 py-1.5">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground">{si + 1}</span>
                    </div>
                    {si < itinerary.stops.length - 1 && (
                      <div className="w-px h-4 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{stop.name}</p>
                    <p className="text-xs text-muted-foreground">{stop.duration}</p>
                  </div>
                  <CategoryBadge category={stop.category} className="text-[10px] px-2 py-0.5" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

/** Review for destination-guide (trip template) */
const TemplateReview = ({
  template,
  onRemove,
}: {
  template: TripTemplate;
  onRemove: (id: string) => void;
}) => (
  <div className="space-y-4">
    <div className="mb-2">
      <h2 className="text-lg font-extrabold text-foreground">{template.title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
    </div>

    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
      <Calendar className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-foreground">
        {template.destinations.reduce((acc, d) => acc + d.suggestedDays, 0)} días sugeridos en total
      </span>
    </div>

    <AnimatePresence>
      {template.destinations.map((dest, index) => (
        <motion.div
          key={dest.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100, height: 0 }}
          transition={{ delay: index * 0.08 }}
          className="glass rounded-2xl overflow-hidden shadow-card"
        >
          <div className="flex gap-3 p-4">
            {dest.coverImage && (
              <img
                src={dest.coverImage}
                alt={dest.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{dest.name}</h3>
                  <p className="text-xs text-muted-foreground">{dest.suggestedDays} días sugeridos</p>
                </div>
                {template.destinations.length > 1 && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(dest.id)}
                    className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </motion.button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{dest.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {dest.highlights.map((h) => (
                  <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ReviewResult;
