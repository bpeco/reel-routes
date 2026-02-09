export type Category = 'cultura' | 'gastronomia' | 'naturaleza' | 'iconico' | 'compras';

export type ReelType = 'single-day' | 'multi-day' | 'destination-guide';

export interface Stop {
  id: string;
  name: string;
  description: string;
  duration: string;
  order: number;
  category: Category;
  coordinates?: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  city: string;
  date: string;
  totalTime: string;
  stops: Stop[];
  coverImage?: string;
  sourceUrl?: string;
  dayNumber?: number; // For multi-day reels: Day 1, Day 2, etc.
}

export interface TemplateDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  highlights: string[];
  suggestedDays: number;
  coverImage?: string;
  coordinates?: { lat: number; lng: number };
}

export interface TripTemplate {
  id: string;
  title: string;
  description: string;
  destinations: TemplateDestination[];
  sourceUrl?: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  itineraries: Itinerary[];
  templates?: TripTemplate[];
  reels?: Array<{ id: string; url: string }>;
}

/** Result of AI processing a reel */
export interface ReelProcessingResult {
  reelType: ReelType;
  /** For single-day: 1 itinerary. For multi-day: N itineraries */
  itineraries?: Itinerary[];
  /** For destination-guide type */
  template?: TripTemplate;
  sourceUrl: string;
}

export type ProcessingState = 
  | 'idle'
  | 'downloading'
  | 'transcribing'
  | 'analyzing'
  | 'generating'
  | 'geocoding'
  | 'success'
  | 'error';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
}
