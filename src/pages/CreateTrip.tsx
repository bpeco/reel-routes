import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Camera, Check, Plane } from 'lucide-react';
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
    }, 2000);
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="flex flex-col items-center">
              {/* Animated plane flying */}
              <motion.div
                initial={{ x: -100, y: 50, opacity: 0 }}
                animate={{ 
                  x: [null, 0, 100],
                  y: [null, -20, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <Plane className="w-12 h-12 text-primary -rotate-45" />
              </motion.div>

              {/* Success checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <Check className="w-8 h-8 text-primary-foreground stroke-[3]" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Success text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-bold text-foreground mb-2"
              >
                Trip Created!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-muted-foreground"
              >
                {destination ? `Get ready for ${destination}` : 'Your adventure awaits'}
              </motion.p>

              {/* Confetti-like dots */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos(i * 45 * Math.PI / 180) * 80,
                    y: Math.sin(i * 45 * Math.PI / 180) * 80,
                  }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
                  }}
                />
              ))}
            </div>
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
