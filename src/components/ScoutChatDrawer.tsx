import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MapPin, Clock, Utensils, Route, ChevronDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: MapPin, label: 'Add a museum' },
  { icon: Utensils, label: 'Find lunch spots' },
  { icon: Clock, label: 'I have 2 extra hours' },
  { icon: Route, label: 'Optimize my route' },
];

const mockResponses: Record<string, string> = {
  'Add a museum': "Great idea! I found the Borghese Gallery nearby. It has an amazing Bernini collection. Would you like me to add it after lunch? It would fit perfectly at 2:30 PM for about 2 hours. ✨",
  'Find lunch spots': "Based on your route, here are 3 great lunch options near the Vatican:\n\n1. **Pizzarium** - Famous for their pizza al taglio\n2. **Osteria dell'Angelo** - Traditional Roman cuisine\n3. **Dal Toscano** - Great pasta dishes\n\nWhich one interests you?",
  'I have 2 extra hours': "Perfect! With 2 extra hours, I suggest adding:\n\n• **Trastevere neighborhood** - Charming streets & local vibes\n• **Piazza Navona** - Beautiful baroque architecture\n\nBoth are on your route! Should I add them?",
  'Optimize my route': "I've analyzed your stops and found a better order that saves 45 minutes of walking! 🚶‍♂️\n\nNew order:\n1. Colosseum → 2. Vatican → 3. Trattoria → 4. Gardens → 5. Shopping\n\nWant me to apply this change?",
};

interface ScoutChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itineraryTitle: string;
}

export const ScoutChatDrawer = ({ isOpen, onClose, itineraryTitle }: ScoutChatDrawerProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm Scout 🌍 I can help you modify your "${itineraryTitle}" itinerary. What would you like to change?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const handleSend = (message?: string) => {
    const content = message || input;
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = mockResponses[content] || "I understand! Let me help you with that. Could you provide a bit more detail about what you'd like to change in your itinerary?";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMinimize = () => setIsMinimized(true);
  const handleExpand = () => setIsMinimized(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Minimized pill */}
          {isMinimized && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleExpand}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full glass shadow-float"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Scout</span>
              {messages.length > 1 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {messages.length - 1}
                </span>
              )}
            </motion.button>
          )}

          {/* Full chat drawer */}
          {!isMinimized && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              />

              {/* Drawer */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto"
                style={{ height: '70vh' }}
              >
                <div className="h-full bg-background rounded-t-3xl shadow-float flex flex-col overflow-hidden">
                  {/* Handle & Header */}
                  <div className="pt-3 pb-2 px-4">
                    <div className="w-10 h-1 rounded-full bg-border mx-auto mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-sunset flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-foreground">Scout</h3>
                          <p className="text-[10px] text-muted-foreground">{itineraryTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={handleMinimize}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                          aria-label="Minimize"
                        >
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={onClose}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                          aria-label="Close"
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-3">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex mb-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                            message.role === 'user'
                              ? 'gradient-sunset text-white rounded-br-sm'
                              : 'bg-muted rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start mb-3"
                      >
                        <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick prompts */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-[10px] text-muted-foreground mb-1.5">Try asking:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {quickPrompts.map((prompt) => (
                          <motion.button
                            key={prompt.label}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSend(prompt.label)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-muted text-xs"
                          >
                            <prompt.icon className="w-3 h-3 text-primary" />
                            <span>{prompt.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-4 py-3 border-t border-border safe-bottom">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask Scout anything..."
                        className="flex-1 h-10 px-3.5 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <Button
                        variant="sunset"
                        size="icon"
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="h-10 w-10 rounded-xl"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};
