import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface ReelLimitBadgeProps {
  used: number;
  limit: number;
  isPremium?: boolean;
}

export const ReelLimitBadge = ({ used, limit, isPremium = false }: ReelLimitBadgeProps) => {
  const navigate = useNavigate();
  const percentage = Math.min((used / limit) * 100, 100);
  const remaining = Math.max(limit - used, 0);
  const isLow = remaining <= 2;
  const isExhausted = remaining === 0;

  if (isPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent/15 border border-accent/20"
      >
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-semibold text-accent">Unlimited Reels</span>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/subscription')}
      className="w-full"
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-colors ${
        isExhausted 
          ? 'bg-destructive/10 border-destructive/20' 
          : isLow 
            ? 'bg-accent/10 border-accent/20' 
            : 'bg-muted/60 border-border'
      }`}>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
          isExhausted ? 'bg-destructive/15' : isLow ? 'gradient-sunset' : 'bg-primary/10'
        }`}>
          <Zap className={`w-4 h-4 ${
            isExhausted ? 'text-destructive' : isLow ? 'text-white' : 'text-primary'
          }`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-foreground">
              {isExhausted ? 'Limit reached' : `${remaining} reel${remaining !== 1 ? 's' : ''} left`}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {used}/{limit}
            </span>
          </div>
          <Progress 
            value={percentage} 
            className={`h-1.5 ${isExhausted ? '[&>div]:bg-destructive' : isLow ? '[&>div]:bg-accent' : '[&>div]:bg-primary'}`} 
          />
        </div>

        <span className="text-[10px] font-bold text-primary uppercase tracking-wide shrink-0">
          Upgrade
        </span>
      </div>
    </motion.button>
  );
};
