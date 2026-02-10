import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

interface PlaneTransitionAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const PlaneTransitionAnimation = ({ isVisible, onComplete }: PlaneTransitionAnimationProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Background color wipe — follows the plane diagonally */}
          <motion.div
            initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 200% 0%, 0% 200%)' }}
            transition={{ delay: 0.3, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-background"
          />

          {/* Contrail / trail behind the plane */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '200vw', opacity: [0, 0.6, 0.3] }}
            transition={{ delay: 0.2, duration: 2, ease: 'easeOut' }}
            className="absolute h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{
              top: '50%',
              left: '-50%',
              transform: 'rotate(-35deg)',
              transformOrigin: 'left center',
            }}
          />

          {/* Second contrail */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '200vw', opacity: [0, 0.4, 0.15] }}
            transition={{ delay: 0.35, duration: 2, ease: 'easeOut' }}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              top: '52%',
              left: '-50%',
              transform: 'rotate(-35deg)',
              transformOrigin: 'left center',
            }}
          />

          {/* The plane */}
          <motion.div
            initial={{ x: '-20vw', y: '120vh', rotate: -35, scale: 0.5, opacity: 0 }}
            animate={{
              x: ['−20vw', '40vw', '120vw'],
              y: ['120vh', '40vh', '-20vh'],
              scale: [0.5, 1.2, 0.8],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1], times: [0, 0.5, 1] }}
            className="absolute"
            style={{ filter: 'drop-shadow(0 4px 20px hsl(var(--primary) / 0.4))' }}
          >
            <motion.div
              animate={{ rotate: [0, -3, 3, 0] }}
              transition={{ duration: 0.6, repeat: 3, ease: 'easeInOut' }}
            >
              <Plane className="w-14 h-14 text-primary -rotate-[35deg]" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Small sparkle particles along the path */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: 30 + i * 40,
                y: -(20 + i * 30),
              }}
              transition={{
                delay: 0.5 + i * 0.15,
                duration: 0.8,
                ease: 'easeOut',
              }}
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              style={{
                left: `${10 + i * 8}%`,
                top: `${80 - i * 8}%`,
              }}
            />
          ))}

          {/* Destination text that appears on the wiped background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className="text-4xl mb-3"
            >
              ✈️
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.4 }}
              className="text-2xl font-bold text-foreground"
            >
              ¡Viaje Confirmado!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.4 }}
              className="text-muted-foreground mt-1"
            >
              Preparando tu aventura…
            </motion.p>
          </motion.div>

          {/* Final fade out and trigger navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3.5, duration: 0.01 }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
