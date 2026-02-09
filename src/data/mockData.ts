import { Trip, Itinerary, Stop, User, ReelProcessingResult, TripTemplate, TemplateDestination } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  isPremium: false,
};

export const mockStops: Stop[] = [
  {
    id: '1',
    name: 'Colosseum',
    description: 'Start your day at the iconic amphitheater. Get there early to avoid crowds.',
    duration: '2h',
    order: 1,
    category: 'iconico',
    coordinates: { lat: 41.8902, lng: 12.4922 },
  },
  {
    id: '2',
    name: 'Trattoria da Enzo',
    description: 'Authentic Roman cuisine in Trastevere. Try the cacio e pepe!',
    duration: '1.5h',
    order: 2,
    category: 'gastronomia',
    coordinates: { lat: 41.8892, lng: 12.4696 },
  },
  {
    id: '3',
    name: 'Vatican Museums',
    description: 'Explore centuries of art including the Sistine Chapel.',
    duration: '3h',
    order: 3,
    category: 'cultura',
    coordinates: { lat: 41.9065, lng: 12.4536 },
  },
  {
    id: '4',
    name: 'Villa Borghese Gardens',
    description: 'Relax in Rome\'s most famous park with stunning views.',
    duration: '1h',
    order: 4,
    category: 'naturaleza',
    coordinates: { lat: 41.9145, lng: 12.4924 },
  },
  {
    id: '5',
    name: 'Via del Corso',
    description: 'Rome\'s main shopping street with Italian brands.',
    duration: '1.5h',
    order: 5,
    category: 'compras',
    coordinates: { lat: 41.9010, lng: 12.4800 },
  },
];

export const mockItinerary: Itinerary = {
  id: '1',
  title: 'Perfect Day in Rome',
  city: 'Rome, Italy',
  date: '2024-03-15',
  totalTime: '9 hours',
  stops: mockStops,
  sourceUrl: 'https://instagram.com/reel/example',
  dayNumber: 1,
};

// Multi-day mock itineraries
export const mockMultiDayItineraries: Itinerary[] = [
  {
    id: 'md1',
    title: 'Day 1 — Historic Rome',
    city: 'Rome, Italy',
    date: '2024-03-15',
    totalTime: '8 hours',
    dayNumber: 1,
    sourceUrl: 'https://instagram.com/reel/multiday1',
    stops: [
      { id: 'md1s1', name: 'Colosseum', description: 'The iconic amphitheater — morning is best.', duration: '2h', order: 1, category: 'iconico' },
      { id: 'md1s2', name: 'Roman Forum', description: 'Walk through ancient ruins.', duration: '1.5h', order: 2, category: 'cultura' },
      { id: 'md1s3', name: 'Trattoria da Enzo', description: 'Lunch in Trastevere.', duration: '1.5h', order: 3, category: 'gastronomia' },
      { id: 'md1s4', name: 'Pantheon', description: 'Stunning architecture.', duration: '1h', order: 4, category: 'iconico' },
    ],
  },
  {
    id: 'md2',
    title: 'Day 2 — Vatican & Gardens',
    city: 'Rome, Italy',
    date: '2024-03-16',
    totalTime: '7 hours',
    dayNumber: 2,
    sourceUrl: 'https://instagram.com/reel/multiday1',
    stops: [
      { id: 'md2s1', name: 'Vatican Museums', description: 'Centuries of art.', duration: '3h', order: 1, category: 'cultura' },
      { id: 'md2s2', name: 'St. Peter\'s Basilica', description: 'Climb the dome.', duration: '1.5h', order: 2, category: 'iconico' },
      { id: 'md2s3', name: 'Villa Borghese Gardens', description: 'Afternoon walk.', duration: '1.5h', order: 3, category: 'naturaleza' },
    ],
  },
  {
    id: 'md3',
    title: 'Day 3 — Local Life',
    city: 'Rome, Italy',
    date: '2024-03-17',
    totalTime: '6 hours',
    dayNumber: 3,
    sourceUrl: 'https://instagram.com/reel/multiday1',
    stops: [
      { id: 'md3s1', name: 'Campo de\' Fiori Market', description: 'Morning market.', duration: '1.5h', order: 1, category: 'gastronomia' },
      { id: 'md3s2', name: 'Via del Corso', description: 'Shopping district.', duration: '2h', order: 2, category: 'compras' },
      { id: 'md3s3', name: 'Trastevere by Night', description: 'Evening atmosphere.', duration: '2h', order: 3, category: 'gastronomia' },
    ],
  },
];

// Destination guide template
export const mockTripTemplate: TripTemplate = {
  id: 'tpl1',
  title: '5 Must-Visit Cities in Italy',
  description: 'The best Italian cities to explore on a two-week trip — from art and history to coastal charm.',
  sourceUrl: 'https://instagram.com/reel/guideitaly1',
  destinations: [
    {
      id: 'dest1',
      name: 'Rome',
      country: 'Italy',
      description: 'The Eternal City — ancient ruins, world-class art, and incredible food.',
      highlights: ['Colosseum', 'Vatican', 'Trastevere'],
      suggestedDays: 3,
      coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    },
    {
      id: 'dest2',
      name: 'Florence',
      country: 'Italy',
      description: 'Renaissance capital with stunning architecture and Tuscan cuisine.',
      highlights: ['Uffizi Gallery', 'Duomo', 'Ponte Vecchio'],
      suggestedDays: 2,
      coverImage: 'https://images.unsplash.com/photo-1543429258-c5ca3e1c86de?w=400',
    },
    {
      id: 'dest3',
      name: 'Venice',
      country: 'Italy',
      description: 'Canal city unlike anywhere else — gondolas, glass, and grandeur.',
      highlights: ['St. Mark\'s Square', 'Rialto Bridge', 'Murano'],
      suggestedDays: 2,
      coverImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400',
    },
    {
      id: 'dest4',
      name: 'Cinque Terre',
      country: 'Italy',
      description: 'Five colorful coastal villages connected by hiking trails.',
      highlights: ['Manarola', 'Vernazza', 'Sentiero Azzurro'],
      suggestedDays: 2,
      coverImage: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=400',
    },
    {
      id: 'dest5',
      name: 'Amalfi Coast',
      country: 'Italy',
      description: 'Dramatic cliffside towns with turquoise waters.',
      highlights: ['Positano', 'Ravello', 'Path of the Gods'],
      suggestedDays: 3,
      coverImage: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=400',
    },
  ],
};

// Mock processing results for each reel type
export const mockSingleDayResult: ReelProcessingResult = {
  reelType: 'single-day',
  itineraries: [mockItinerary],
  sourceUrl: 'https://instagram.com/reel/example',
};

export const mockMultiDayResult: ReelProcessingResult = {
  reelType: 'multi-day',
  itineraries: mockMultiDayItineraries,
  sourceUrl: 'https://instagram.com/reel/multiday1',
};

export const mockDestinationGuideResult: ReelProcessingResult = {
  reelType: 'destination-guide',
  template: mockTripTemplate,
  sourceUrl: 'https://instagram.com/reel/guideitaly1',
};

export const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Italian Adventure',
    destination: 'Italy',
    startDate: '2024-03-14',
    endDate: '2024-03-21',
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    itineraries: [mockItinerary],
    templates: [mockTripTemplate],
    reels: [
      { id: 'r1', url: 'https://instagram.com/reel/example1' },
      { id: 'r2', url: 'https://instagram.com/reel/example2' },
    ],
  },
  {
    id: '2',
    name: 'Tokyo Explorer',
    destination: 'Japan',
    startDate: '2024-04-10',
    endDate: '2024-04-18',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    itineraries: [],
    reels: [{ id: 'r3', url: 'https://instagram.com/reel/example3' }],
  },
  {
    id: '3',
    name: 'Barcelona Weekend',
    destination: 'Spain',
    startDate: '2024-05-01',
    endDate: '2024-05-04',
    coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    itineraries: [],
    reels: [],
  },
];
