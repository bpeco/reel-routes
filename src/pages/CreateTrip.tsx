import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Camera, MapPin, Stamp } from 'lucide-react';
import DestinationInput from '@/components/DestinationInput';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/home');
    }, 3500);
  };

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          >
            {/* Background gradient pulse */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl"
            />

            {/* Boarding Pass Card */}
            <motion.div
              initial={{ y: 300, opacity: 0, rotateX: 45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative w-80 bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
            >
              {/* Ticket header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider">Boarding Pass</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                  >
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                </div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl font-bold text-primary-foreground mt-1"
                >
                  {name || 'New Adventure'}
                </motion.h3>
              </div>

              {/* Ticket perforation */}
              <div className="relative h-4 bg-card">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full" />
                <div className="absolute inset-x-8 top-1/2 border-t-2 border-dashed border-muted-foreground/30" />
              </div>

              {/* Ticket body */}
              <div className="px-5 py-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase">Destination</span>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-lg font-semibold text-foreground"
                    >
                      {destination || 'Anywhere'}
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground uppercase">Date</span>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="text-sm font-medium text-foreground"
                    >
                      {startDate || 'Anytime'}
                    </motion.p>
                  </div>
                </div>

                {/* Stamp overlay */}
                <motion.div
                  initial={{ scale: 3, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ 
                    delay: 1.5, 
                    duration: 0.15,
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  className="absolute bottom-12 right-4 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/10">
                    <div className="text-center">
                      <Stamp className="w-6 h-6 text-green-500 mx-auto mb-0.5" />
                      <span className="text-[10px] font-bold text-green-500 uppercase">Approved</span>
                    </div>
                  </div>
                </motion.div>

                {/* Barcode */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="flex gap-0.5 justify-center pt-2"
                >
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-foreground/80 rounded-sm"
                      style={{
                        width: Math.random() > 0.5 ? 2 : 3,
                        height: 24 + Math.random() * 8,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Success text below card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="absolute bottom-20 text-center"
            >
              <p className="text-lg font-semibold text-foreground">Trip Created! ✨</p>
              <p className="text-sm text-muted-foreground">Pack your bags</p>
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: 100,
                  x: (i - 6) * 30,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: -200 - Math.random() * 200,
                  x: (i - 6) * 30 + (Math.random() - 0.5) * 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  rotate: Math.random() * 360,
                }}
                transition={{ 
                  delay: 1.6 + i * 0.05,
                  duration: 1.5,
                  ease: "easeOut"
                }}
                className="absolute bottom-1/3 text-2xl"
              >
                {['✈️', '🎬', '🌍', '📍', '⭐', '🎒'][i % 6]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-4 safe-top flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h1 className="text-xl font-bold text-foreground">New Trip</h1>
      </div>

      <div className="flex-1 px-6 py-4">
        {/* Cover Image Picker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-48 rounded-3xl bg-muted mb-6 overflow-hidden"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center mb-2">
              <Camera className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Add cover photo</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleCreate}
          className="space-y-5"
        >
          {/* Trip Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Trip Name
            </label>
            <Input
              type="text"
              placeholder="e.g., Italian Adventure"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Destination */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Destination
            </label>
            <DestinationInput
              value={destination}
              onChange={setDestination}
              placeholder="e.g., Rome, Italy"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button variant="sunset" size="lg" className="w-full mt-8" type="submit">
            Create Trip
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateTrip;
