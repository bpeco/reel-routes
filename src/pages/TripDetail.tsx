import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/EmptyState';
import { mockTrips } from '@/data/mockData';
import { ArrowLeft, Calendar, MapPin, Plus, Film, MoreVertical, Compass, ChevronRight, Layers } from 'lucide-react';
import { format } from 'date-fns';

const TripDetail = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const trip = mockTrips.find((t) => t.id === tripId) || mockTrips[0];
  const [activeTab, setActiveTab] = useState<'itineraries' | 'templates' | 'map'>('itineraries');

  const hasTemplates = trip.templates && trip.templates.length > 0;

  return (
    <div className="mobile-container min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative h-64">
        <img
          src={trip.coverImage}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 safe-top flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass-dark flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full glass-dark flex items-center justify-center"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Trip info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">{trip.name}</h1>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="flex gap-1 p-1 bg-muted rounded-2xl">
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'itineraries'
                ? 'bg-background shadow-card text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Itineraries ({trip.itineraries.length})
          </button>
          {hasTemplates && (
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'templates'
                  ? 'bg-background shadow-card text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Guides ({trip.templates!.length})
            </button>
          )}
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'map'
                ? 'bg-background shadow-card text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        {activeTab === 'itineraries' ? (
          trip.itineraries.length === 0 ? (
            <EmptyState
              title="No itineraries yet"
              description="Add your first itinerary from an Instagram or TikTok reel!"
              actionLabel="Add from Reel"
              onAction={() => navigate(`/trip/${tripId}/add-reel`)}
              icon={Film}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {trip.itineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                  className="glass rounded-2xl p-4 shadow-card cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {itinerary.dayNumber && (
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-extrabold text-primary">{itinerary.dayNumber}</span>
                        </div>
                      )}
                      <h3 className="font-bold text-foreground">{itinerary.title}</h3>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {itinerary.stops.length} stops
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{itinerary.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{itinerary.totalTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/trip/${tripId}/add-reel`)}
                >
                  <Plus className="w-4 h-4" />
                  Add Reel
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/trip/${tripId}/merge-reels`)}
                >
                  <Layers className="w-4 h-4" />
                  Merge Reels
                </Button>
              </div>
            </motion.div>
          )
        ) : activeTab === 'templates' && hasTemplates ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {trip.templates!.map((template) => (
              <div key={template.id} className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">{template.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{template.description}</p>

                {template.destinations.map((dest, di) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: di * 0.08 }}
                    className="glass rounded-2xl overflow-hidden shadow-card"
                  >
                    <div className="flex gap-3 p-3">
                      {dest.coverImage && (
                        <img
                          src={dest.coverImage}
                          alt={dest.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-foreground text-sm">{dest.name}</h4>
                          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {dest.suggestedDays}d
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{dest.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {dest.highlights.slice(0, 3).map((h) => (
                            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="h-64 rounded-2xl bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Map view coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetail;
