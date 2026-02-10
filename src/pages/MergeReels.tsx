import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { mockMultiDayItineraries } from '@/data/mockData';
import {
  ArrowLeft,
  Link2,
  Layers,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

type FlowStep = 'input' | 'ocr-review' | 'processing' | 'done';

// Mock OCR extraction
const mockOcrExtract = (): string[] => [
  'https://www.instagram.com/reel/ABC123/',
  'https://www.tiktok.com/@user/video/987654',
  'https://www.youtube.com/watch?v=xyz',
  'https://www.instagram.com/reel/DEF456/',
  'https://twitter.com/user/status/111',
  'https://www.tiktok.com/@traveler/video/222333',
];

const isValidReelUrl = (url: string): boolean => {
  const lower = url.toLowerCase().trim();
  return (
    lower.includes('instagram.com/reel') ||
    lower.includes('tiktok.com') 
  );
};

const getPlatform = (url: string): 'instagram' | 'tiktok' => {
  return url.toLowerCase().includes('tiktok') ? 'tiktok' : 'instagram';
};

const MergeReels = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<FlowStep>('input');
  const [textInput, setTextInput] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [ocrUrls, setOcrUrls] = useState<{ url: string; valid: boolean }[]>([]);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalToProcess, setTotalToProcess] = useState(0);

  // Parse textarea and add valid URLs as chips
  const parseAndAddUrls = () => {
    const urls = textInput
      .split(/[\n,\s]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0 && isValidReelUrl(u))
      .filter((u) => !chips.includes(u));
    if (urls.length > 0) {
      setChips((prev) => [...prev, ...urls]);
      setTextInput('');
    }
  };

  const removeChip = (url: string) => {
    setChips((prev) => prev.filter((c) => c !== url));
  };

  // Screenshot upload → mock OCR
  const handleScreenshotUpload = () => {
    // Simulate OCR extraction
    const extracted = mockOcrExtract();
    setOcrUrls(extracted.map((url) => ({ url, valid: isValidReelUrl(url) })));
    setStep('ocr-review');
  };

  const confirmOcrUrls = () => {
    const validUrls = ocrUrls.filter((o) => o.valid).map((o) => o.url);
    setChips((prev) => [...prev, ...validUrls.filter((u) => !prev.includes(u))]);
    setStep('input');
  };

  const removeOcrUrl = (index: number) => {
    setOcrUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Start merge processing
  const startProcessing = () => {
    setTotalToProcess(chips.length);
    setProcessedCount(0);
    setStep('processing');
  };

  // Simulate sequential reel processing
  useEffect(() => {
    if (step !== 'processing') return;
    if (processedCount >= totalToProcess) {
      const timer = setTimeout(() => setStep('done'), 800);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setProcessedCount((prev) => prev + 1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [step, processedCount, totalToProcess]);

  // When done, navigate to review with merged result
  useEffect(() => {
    if (step !== 'done') return;
    const timer = setTimeout(() => {
      navigate(`/trip/${tripId}/review`, {
        state: {
          result: {
            reelType: 'multi-day',
            itineraries: mockMultiDayItineraries,
            sourceUrl: 'merge',
          },
          tripId,
        },
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [step, navigate, tripId]);

  const progressPercent = totalToProcess > 0 ? (processedCount / totalToProcess) * 100 : 0;

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 safe-top flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => (step === 'input' ? navigate(-1) : setStep('input'))}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          disabled={step === 'processing'}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h1 className="text-xl font-bold text-foreground">Merge Reels</h1>
      </div>

      <div className="flex-1 px-6 py-4">
        <AnimatePresence mode="wait">
          {/* ─── STEP: INPUT ─── */}
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Illustration */}
              <div className="flex justify-center mb-2">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 rounded-3xl gradient-ocean flex items-center justify-center shadow-float"
                >
                  <Layers className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  Combine multiple reels
                </h2>
                <p className="text-sm text-muted-foreground">
                  Paste several Instagram / TikTok links or upload a screenshot. We'll merge them into one multi-day plan.
                </p>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <div className="relative">
                  <Link2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    placeholder={'Paste one URL per line…\nhttps://instagram.com/reel/...\nhttps://tiktok.com/@user/video/...'}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="pl-9 min-h-[100px] text-sm rounded-2xl border-2 border-input focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-all"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={parseAndAddUrls}
                  disabled={!textInput.trim()}
                >
                  <Link2 className="w-4 h-4" />
                  Add links
                </Button>
              </div>

              {/* Screenshot upload */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleScreenshotUpload}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  Upload screenshot with links
                </Button>
              </div>

              {/* Chips */}
              {chips.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {chips.length} reel{chips.length > 1 ? 's' : ''} ready
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((url) => (
                      <motion.div
                        key={url}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium max-w-[260px]"
                      >
                        <span
                          className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-white text-[8px] font-bold ${
                            getPlatform(url) === 'instagram'
                              ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'
                              : 'bg-black'
                          }`}
                        >
                          {getPlatform(url) === 'instagram' ? 'IG' : 'TT'}
                        </span>
                        <span className="truncate">{url.replace(/https?:\/\/(www\.)?/, '')}</span>
                        <button onClick={() => removeChip(url)} className="flex-shrink-0">
                          <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process button */}
              <Button
                variant="sunset"
                size="lg"
                className="w-full"
                disabled={chips.length < 2}
                onClick={startProcessing}
              >
                <Sparkles className="w-4 h-4" />
                Merge {chips.length} reel{chips.length !== 1 ? 's' : ''}
              </Button>

              {chips.length < 2 && chips.length > 0 && (
                <p className="text-xs text-center text-muted-foreground">
                  Add at least 2 reels to merge
                </p>
              )}
            </motion.div>
          )}

          {/* ─── STEP: OCR REVIEW ─── */}
          {step === 'ocr-review' && (
            <motion.div
              key="ocr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  Links detected
                </h2>
                <p className="text-sm text-muted-foreground">
                  We found {ocrUrls.length} URLs. Only Instagram & TikTok links will be used.
                </p>
              </div>

              <div className="space-y-2">
                {ocrUrls.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${
                      item.valid
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-border bg-muted/50 opacity-50'
                    }`}
                  >
                    {item.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="text-xs flex-1 truncate">{item.url}</span>
                    <button onClick={() => removeOcrUrl(i)} className="flex-shrink-0">
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep('input')}
                >
                  Cancel
                </Button>
                <Button
                  variant="sunset"
                  className="flex-1"
                  onClick={confirmOcrUrls}
                  disabled={ocrUrls.filter((o) => o.valid).length === 0}
                >
                  Add {ocrUrls.filter((o) => o.valid).length} links
                </Button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP: PROCESSING ─── */}
          {(step === 'processing' || step === 'done') && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center pt-16 space-y-8"
            >
              <motion.div
                animate={{ rotate: step === 'done' ? 0 : 360 }}
                transition={{ duration: 2, repeat: step === 'done' ? 0 : Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-3xl gradient-sunset flex items-center justify-center shadow-float"
              >
                {step === 'done' ? (
                  <CheckCircle2 className="w-10 h-10 text-white" />
                ) : (
                  <Layers className="w-10 h-10 text-white" />
                )}
              </motion.div>

              <div className="w-full max-w-xs space-y-3">
                <Progress value={progressPercent} className="h-2" />
                <p className="text-center text-sm font-medium text-foreground">
                  {step === 'done'
                    ? 'Merging into itinerary…'
                    : `Processing reel ${processedCount + 1} of ${totalToProcess}`}
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  {step === 'done'
                    ? 'Almost ready!'
                    : 'Analyzing content & extracting locations…'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MergeReels;
