import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Film, Sparkles, Map } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const steps = [
  {
    icon: Film,
    title: 'Compartí un Reel',
    subtitle: 'Instagram o TikTok',
    description: 'Encontraste un lugar increíble en un reel? Compartilo directo a Travel-Reel y dejá que la magia comience.',
    gradient: 'from-orange-500 to-rose-500',
    bgAccent: 'bg-orange-500/10',
  },
  {
    icon: Sparkles,
    title: 'IA genera tu itinerario',
    subtitle: 'En segundos',
    description: 'Nuestra IA analiza el contenido, extrae los lugares y arma un itinerario completo con horarios, mapas y categorías.',
    gradient: 'from-violet-500 to-indigo-500',
    bgAccent: 'bg-violet-500/10',
  },
  {
    icon: Map,
    title: 'Viajá sin preocuparte',
    subtitle: 'Todo organizado',
    description: 'Tus trips, itinerarios y paradas en un solo lugar. Compartí con amigos y disfrutá cada aventura.',
    gradient: 'from-emerald-500 to-teal-500',
    bgAccent: 'bg-emerald-500/10',
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: true });

  useEffect(() => {
    if (!emblaApi) return;
    const handleSelect = () => setCurrentStep(emblaApi.selectedScrollSnap());
    emblaApi.on('select', handleSelect);
    handleSelect();
    return () => { emblaApi.off('select', handleSelect); };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  const isLast = currentStep === steps.length - 1;

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="flex justify-end p-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/signup')}
          className="text-muted-foreground text-sm"
        >
          Saltar
        </Button>
      </div>

      {/* Carousel */}
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {steps.map((step, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-full px-6 flex flex-col items-center justify-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-8 shadow-float`}
              >
                <step.icon className="w-14 h-14 text-white" />
              </motion.div>

              {/* Badge */}
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${step.bgAccent} text-foreground mb-4`}>
                Paso {index + 1} de 3
              </span>

              {/* Text */}
              <h2 className="text-3xl font-extrabold text-foreground text-center mb-2">
                {step.title}
              </h2>
              <p className={`text-lg font-semibold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-4`}>
                {step.subtitle}
              </p>
              <p className="text-muted-foreground text-center text-base leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-10 pt-4 space-y-5">
        {/* Dots + Arrows */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollTo(currentStep - 1)}
            disabled={currentStep === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (isLast) {
                navigate('/signup');
              } else {
                scrollTo(currentStep + 1);
              }
            }}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* CTA on last step */}
        <AnimatePresence>
          {isLast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <Button
                variant="sunset"
                size="lg"
                className="w-full"
                onClick={() => navigate('/signup')}
              >
                Empezar ahora
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
