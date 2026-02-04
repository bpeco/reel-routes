import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProcessingAnimation } from '@/components/ProcessingAnimation';
import { ReelToItineraryAnimation } from '@/components/ReelToItineraryAnimation';
import { ProcessingState } from '@/types';
import { ArrowLeft, Link2, Sparkles, Play } from 'lucide-react';

interface LocationState {
  reelUrl?: string;
  thumbnail?: string;
  platform?: 'instagram' | 'tiktok';
  fromShare?: boolean;
}

const AddReel = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  // If coming from share, use the data from state
  const fromShare = state?.fromShare ?? false;
  const [reelUrl, setReelUrl] = useState(state?.reelUrl ?? '');
  const [processingState, setProcessingState] = useState<ProcessingState>(fromShare ? 'downloading' : 'idle');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelUrl) return;

    // Simulate processing states
    setProcessingState('downloading');
  };

  useEffect(() => {
    if (processingState === 'idle' || processingState === 'success' || processingState === 'error') {
      return;
    }

    const stateSequence: ProcessingState[] = ['downloading', 'transcribing', 'generating', 'geocoding', 'success'];
    const currentIndex = stateSequence.indexOf(processingState);
    
    if (currentIndex < stateSequence.length - 1) {
      const timer = setTimeout(() => {
        setProcessingState(stateSequence[currentIndex + 1]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [processingState]);

  useEffect(() => {
    if (processingState === 'success') {
      // Show the reel-to-itinerary animation
      setShowSuccessAnimation(true);
    }
  }, [processingState]);

  const handleAnimationComplete = () => {
    navigate('/itinerary/1');
  };

  const isProcessing = processingState !== 'idle' && processingState !== 'success' && processingState !== 'error';

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Success Animation */}
      <ReelToItineraryAnimation 
        isVisible={showSuccessAnimation} 
        onComplete={handleAnimationComplete}
      />

      {/* Header */}
      <div className="p-4 safe-top flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h1 className="text-xl font-bold text-foreground">Add from Reel</h1>
      </div>

      <div className="flex-1 px-6 py-4">
        <AnimatePresence mode="wait">
          {processingState === 'idle' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Illustration */}
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 rounded-3xl gradient-sunset flex items-center justify-center shadow-float"
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>
              </div>

              {/* Instructions */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Paste your Reel URL
                </h2>
                <p className="text-muted-foreground">
                  We'll extract all the travel tips and create a beautiful itinerary for you
                </p>
              </div>

              {/* URL Input */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://instagram.com/reel/..."
                    value={reelUrl}
                    onChange={(e) => setReelUrl(e.target.value)}
                    className="pl-12"
                  />
                </div>

                {/* Supported platforms */}
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                      IG
                    </span>
                    Instagram
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
                      TT
                    </span>
                    TikTok
                  </span>
                </div>

                <Button
                  variant="sunset"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={!reelUrl}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Itinerary
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              {/* Show reel preview when coming from share */}
              {fromShare && state?.thumbnail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-float">
                    <img 
                      src={state.thumbnail} 
                      alt="Reel" 
                      className="w-full h-full object-cover"
                    />
                    {/* Platform badge */}
                    {state.platform === 'instagram' ? (
                      <span className="absolute top-2 left-2 w-5 h-5 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                        IG
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 w-5 h-5 rounded bg-black flex items-center justify-center text-white text-[10px] font-bold">
                        TT
                      </span>
                    )}
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <ProcessingAnimation state={processingState} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddReel;
