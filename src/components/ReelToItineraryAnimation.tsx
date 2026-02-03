import { motion, AnimatePresence } from 'framer-motion';
import { Film, MapPin, Utensils, Camera, ShoppingBag, TreePine, Landmark, Sparkles } from 'lucide-react';

interface ReelToItineraryAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const destinationIcons = [
  { Icon: MapPin, delay: 0, x: -80, y: -60, color: 'text-rose-500' },
  { Icon: Utensils, delay: 0.1, x: 80, y: -40, color: 'text-orange-500' },
  { Icon: Camera, delay: 0.2, x: -60, y: 60, color: 'text-blue-500' },
  { Icon: ShoppingBag, delay: 0.3, x: 70, y: 50, color: 'text-purple-500' },
  { Icon: TreePine, delay: 0.4, x: 0, y: -90, color: 'text-emerald-500' },
  { Icon: Landmark, delay: 0.5, x: -90, y: 0, color: 'text-amber-500' },
];

export const ReelToItineraryAnimation = ({ isVisible, onComplete }: ReelToItineraryAnimationProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Background particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0.5],
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 400,
              }}
              transition={{ 
                delay: 1.2 + i * 0.05,
                duration: 1.5,
                ease: "easeOut"
              }}
              className="absolute w-2 h-2 rounded-full bg-primary/40"
            />
          ))}

          {/* Central reel icon that explodes */}
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ 
              scale: [1, 1.3, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 1,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
            className="absolute"
          >
            <div className="w-24 h-24 rounded-3xl gradient-sunset flex items-center justify-center shadow-float">
              <Film className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Explosion ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 3, 4],
              opacity: [0, 0.5, 0],
            }}
            transition={{ 
              delay: 0.8,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="absolute w-24 h-24 rounded-full border-4 border-primary"
          />

          {/* Destination icons flying out */}
          {destinationIcons.map(({ Icon, delay, x, y, color }, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                x: [0, x * 1.5, x],
                y: [0, y * 1.5, y],
                opacity: [0, 1, 1],
              }}
              transition={{ 
                delay: 1 + delay,
                duration: 0.8,
                ease: "easeOut"
              }}
              className="absolute"
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  delay: 1.8 + delay,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-14 h-14 rounded-2xl bg-card shadow-lg flex items-center justify-center border border-border"
              >
                <Icon className={`w-7 h-7 ${color}`} />
              </motion.div>
            </motion.div>
          ))}

          {/* Central sparkle icon after explosion */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 1.5,
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
            className="absolute"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-10 h-10 text-primary" />
            </motion.div>
          </motion.div>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-32 text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">
              ¡Itinerario Listo! 🎉
            </h3>
            <p className="text-muted-foreground">
              Encontramos todos los lugares del reel
            </p>
          </motion.div>

          {/* Progress indicator that fills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-20 w-48"
          >
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 2.3, duration: 0.8, ease: "easeOut" }}
                onAnimationComplete={onComplete}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
