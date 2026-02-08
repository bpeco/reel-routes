import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TripCard } from '@/components/TripCard';
import { EmptyState } from '@/components/EmptyState';
import { BottomNav, FloatingAddButton } from '@/components/BottomNav';
import { ShareReelSheet } from '@/components/ShareReelSheet';
import { mockTrips, mockUser } from '@/data/mockData';
import { Trip } from '@/types';
import { Bell, Search, Plane, Share2 } from 'lucide-react';

// Mock reel data for simulation
const mockReelData = {
  url: 'https://instagram.com/reel/C8xK2mLo9Qp/',
  thumbnail: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400',
  platform: 'instagram' as const,
};

const Home = () => {
  const navigate = useNavigate();
  const [trips] = useState<Trip[]>(mockTrips);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = trips.filter((trip) =>
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mobile-container min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="p-6 safe-top">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl font-bold text-foreground">{mockUser.name.split(' ')[0]} 👋</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary border-2 border-background" />
          </motion.button>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6">
        {/* Boarding Pass Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6 overflow-hidden"
        >
          {/* Boarding pass card */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {/* Top strip */}
            <div className="gradient-sunset px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">Boarding Pass</span>
              </div>
              <span className="text-xs text-white/80 font-medium">{mockUser.name.split(' ')[0].toUpperCase()}</span>
            </div>

            {/* Main content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                {/* From */}
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-foreground tracking-tight">{trips.length}</p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Trips</p>
                </div>

                {/* Plane divider */}
                <div className="flex-1 flex items-center justify-center px-3">
                  <div className="h-px flex-1 border-t border-dashed border-border" />
                  <Plane className="w-4 h-4 text-primary mx-2 rotate-0" />
                  <div className="h-px flex-1 border-t border-dashed border-border" />
                </div>

                {/* To */}
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-foreground tracking-tight">
                    {trips.reduce((acc, t) => acc + t.itineraries.length, 0)}
                  </p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Itineraries</p>
                </div>
              </div>

              {/* Tear line */}
              <div className="relative flex items-center my-2">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-background" />
                <div className="w-full border-t border-dashed border-border" />
                <div className="absolute -right-6 w-5 h-5 rounded-full bg-background" />
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Days Planned</p>
                  <p className="text-xl font-extrabold text-gradient-sunset">12</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                  <p className="text-xs font-bold text-primary">✈ Ready</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Seat</p>
                  <p className="text-xs font-bold text-foreground">1A ★</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trips Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Your Trips</h2>
          <button className="text-sm text-primary font-medium">See all</button>
        </div>

        {filteredTrips.length === 0 && searchQuery === '' ? (
          <EmptyState
            title="No trips yet"
            description="Start by creating a new trip and add your first reel-based itinerary!"
            actionLabel="Create Trip"
            onAction={() => navigate('/create-trip')}
            icon={Plane}
          />
        ) : filteredTrips.length === 0 ? (
          <EmptyState
            title="No results"
            description="Try searching for something else"
            icon={Search}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <TripCard
                  trip={trip}
                  onClick={() => navigate(`/trip/${trip.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Share Simulation FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowShareSheet(true)}
        className="fixed bottom-24 left-6 z-50 w-14 h-14 rounded-full gradient-ocean shadow-float flex items-center justify-center"
      >
        <Share2 className="w-6 h-6 text-white" />
      </motion.button>

      {/* FAB */}
      <FloatingAddButton onClick={() => navigate('/create-trip')} />

      {/* Share Reel Sheet */}
      <ShareReelSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        trips={trips}
        reelData={mockReelData}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
