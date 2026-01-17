import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Destination {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
}

const DESTINATIONS: Destination[] = [
  { id: '1', city: 'Rome', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { id: '2', city: 'Milan', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { id: '3', city: 'Florence', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { id: '4', city: 'Venice', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { id: '5', city: 'Paris', country: 'France', countryCode: 'FR', flag: '🇫🇷' },
  { id: '6', city: 'Nice', country: 'France', countryCode: 'FR', flag: '🇫🇷' },
  { id: '7', city: 'Lyon', country: 'France', countryCode: 'FR', flag: '🇫🇷' },
  { id: '8', city: 'Barcelona', country: 'Spain', countryCode: 'ES', flag: '🇪🇸' },
  { id: '9', city: 'Madrid', country: 'Spain', countryCode: 'ES', flag: '🇪🇸' },
  { id: '10', city: 'Seville', country: 'Spain', countryCode: 'ES', flag: '🇪🇸' },
  { id: '11', city: 'London', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧' },
  { id: '12', city: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧' },
  { id: '13', city: 'Tokyo', country: 'Japan', countryCode: 'JP', flag: '🇯🇵' },
  { id: '14', city: 'Kyoto', country: 'Japan', countryCode: 'JP', flag: '🇯🇵' },
  { id: '15', city: 'Osaka', country: 'Japan', countryCode: 'JP', flag: '🇯🇵' },
  { id: '16', city: 'New York', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { id: '17', city: 'Los Angeles', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { id: '18', city: 'Miami', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { id: '19', city: 'San Francisco', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { id: '20', city: 'Sydney', country: 'Australia', countryCode: 'AU', flag: '🇦🇺' },
  { id: '21', city: 'Melbourne', country: 'Australia', countryCode: 'AU', flag: '🇦🇺' },
  { id: '22', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', flag: '🇳🇱' },
  { id: '23', city: 'Berlin', country: 'Germany', countryCode: 'DE', flag: '🇩🇪' },
  { id: '24', city: 'Munich', country: 'Germany', countryCode: 'DE', flag: '🇩🇪' },
  { id: '25', city: 'Lisbon', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹' },
  { id: '26', city: 'Porto', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹' },
  { id: '27', city: 'Bangkok', country: 'Thailand', countryCode: 'TH', flag: '🇹🇭' },
  { id: '28', city: 'Bali', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩' },
  { id: '29', city: 'Singapore', country: 'Singapore', countryCode: 'SG', flag: '🇸🇬' },
  { id: '30', city: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪' },
  { id: '31', city: 'Cairo', country: 'Egypt', countryCode: 'EG', flag: '🇪🇬' },
  { id: '32', city: 'Marrakech', country: 'Morocco', countryCode: 'MA', flag: '🇲🇦' },
  { id: '33', city: 'Cape Town', country: 'South Africa', countryCode: 'ZA', flag: '🇿🇦' },
  { id: '34', city: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR', flag: '🇧🇷' },
  { id: '35', city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', flag: '🇦🇷' },
  { id: '36', city: 'Mexico City', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽' },
  { id: '37', city: 'Cancun', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽' },
  { id: '38', city: 'Prague', country: 'Czech Republic', countryCode: 'CZ', flag: '🇨🇿' },
  { id: '39', city: 'Vienna', country: 'Austria', countryCode: 'AT', flag: '🇦🇹' },
  { id: '40', city: 'Athens', country: 'Greece', countryCode: 'GR', flag: '🇬🇷' },
  { id: '41', city: 'Santorini', country: 'Greece', countryCode: 'GR', flag: '🇬🇷' },
  { id: '42', city: 'Istanbul', country: 'Turkey', countryCode: 'TR', flag: '🇹🇷' },
  { id: '43', city: 'Seoul', country: 'South Korea', countryCode: 'KR', flag: '🇰🇷' },
  { id: '44', city: 'Hong Kong', country: 'China', countryCode: 'HK', flag: '🇭🇰' },
  { id: '45', city: 'Beijing', country: 'China', countryCode: 'CN', flag: '🇨🇳' },
  { id: '46', city: 'Shanghai', country: 'China', countryCode: 'CN', flag: '🇨🇳' },
  { id: '47', city: 'Moscow', country: 'Russia', countryCode: 'RU', flag: '🇷🇺' },
  { id: '48', city: 'Dublin', country: 'Ireland', countryCode: 'IE', flag: '🇮🇪' },
  { id: '49', city: 'Reykjavik', country: 'Iceland', countryCode: 'IS', flag: '🇮🇸' },
  { id: '50', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', flag: '🇩🇰' },
];

interface DestinationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (destination: Destination) => void;
  placeholder?: string;
  className?: string;
}

const DestinationInput = ({
  value,
  onChange,
  onSelect,
  placeholder = "Search cities or countries...",
  className,
}: DestinationInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredDestinations = value.length > 0
    ? DESTINATIONS.filter(
        (dest) =>
          dest.city.toLowerCase().includes(value.toLowerCase()) ||
          dest.country.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6)
    : [];

  const showDropdown = isOpen && filteredDestinations.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredDestinations.length]);

  const handleSelect = (destination: Destination) => {
    onChange(`${destination.city}, ${destination.country}`);
    setSelectedFlag(destination.flag);
    setIsOpen(false);
    onSelect?.(destination);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredDestinations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredDestinations[highlightedIndex]) {
          handleSelect(filteredDestinations[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setSelectedFlag(null);
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        {/* Flag or MapPin icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          {selectedFlag ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xl"
            >
              {selectedFlag}
            </motion.span>
          ) : (
            <MapPin className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-10"
        />

        {/* Search indicator */}
        <AnimatePresence>
          {value.length > 0 && !selectedFlag && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border-2 border-border rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="py-2">
              {filteredDestinations.map((destination, index) => (
                <motion.button
                  key={destination.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(destination)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "w-full px-4 py-3 flex items-center gap-3 transition-colors",
                    highlightedIndex === index
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  )}
                >
                  {/* Flag */}
                  <span className="text-2xl">{destination.flag}</span>

                  {/* City & Country */}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-foreground">
                      {highlightText(destination.city, value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {highlightText(destination.country, value)}
                    </div>
                  </div>

                  {/* Indicator */}
                  {highlightedIndex === index && (
                    <motion.div
                      layoutId="destination-highlight"
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Use ↑↓ to navigate, Enter to select
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function to highlight matching text
const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-primary font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default DestinationInput;
