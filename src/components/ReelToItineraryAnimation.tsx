import { motion, AnimatePresence } from 'framer-motion';
import { Film, MapPin, Utensils, Camera, ShoppingBag, TreePine, Landmark, Sparkles } from 'lucide-react';

interface ReelToItineraryAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

// Positions arranged in a circular path for the route
const destinationIcons = [
  { Icon: MapPin, x: 0, y: -100, color: 'text-rose-500', label: 'Inicio' },
  { Icon: Landmark, x: 85, y: -50, color: 'text-amber-500', label: 'Cultura' },
  { Icon: Utensils, x: 85, y: 50, color: 'text-orange-500', label: 'Comida' },
  { Icon: Camera, x: 0, y: 100, color: 'text-blue-500', label: 'Fotos' },
  { Icon: ShoppingBag, x: -85, y: 50, color: 'text-purple-500', label: 'Compras' },
  { Icon: TreePine, x: -85, y: -50, color: 'text-emerald-500', label: 'Naturaleza' },
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
                delay: 1.5 + i * 0.08,
                duration: 2,
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
              duration: 1.5,
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
              delay: 1.2,
              duration: 1,
              ease: "easeOut"
            }}
            className="absolute w-24 h-24 rounded-full border-4 border-primary"
          />

          {/* SVG Path connecting destinations */}
          <svg 
            className="absolute w-[250px] h-[280px]" 
            style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
            viewBox="-125 -140 250 280"
          >
            {/* Dashed path connecting all points */}
            <motion.path
              d={`M 0,-100 
                  L 85,-50 
                  L 85,50 
                  L 0,100 
                  L -85,50 
                  L -85,-50 
                  Z`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ 
                delay: 2.5,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated dot traveling along the path */}
            <motion.circle
              r="6"
              fill="hsl(var(--primary))"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 2.5, duration: 2.5 }}
            >
              <animateMotion
                dur="2.5s"
                begin="2.5s"
                repeatCount="1"
                path="M 0,-100 L 85,-50 L 85,50 L 0,100 L -85,50 L -85,-50 Z"
              />
            </motion.circle>
          </svg>

          {/* Destination icons flying out */}
          {destinationIcons.map(({ Icon, x, y, color, label }, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                x: [0, x * 1.3, x],
                y: [0, y * 1.3, y],
                opacity: [0, 1, 1],
              }}
              transition={{ 
                delay: 1.5 + index * 0.15,
                duration: 1,
                ease: "easeOut"
              }}
              className="absolute"
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ 
                  delay: 3 + index * 0.1,
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-card shadow-lg flex items-center justify-center border border-border">
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + index * 0.1 }}
                  className="text-xs font-medium text-muted-foreground mt-1"
                >
                  {label}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}

          {/* Central sparkle icon after explosion */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 2.2,
              duration: 0.6,
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
            transition={{ delay: 3.5, duration: 0.6 }}
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
            transition={{ delay: 4.2 }}
            className="absolute bottom-20 w-48"
          >
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 4.4, duration: 1, ease: "easeOut" }}
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
