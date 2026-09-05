export type Category = 'Cafe' | 'Restaurant' | 'Bar' | 'Street Food' | 'Bakery' | 'Izakaya' | 'Diner';
export type District = 'South Jakarta' | 'Central Jakarta' | 'West Jakarta' | 'North Jakarta' | 'East Jakarta';
export type NoiseLevel = 'Chill' | 'Moderate' | 'Loud';
export type PriceRange = 'Rp 20k - 50k' | 'Rp 50k - 100k' | 'Rp 100k - 200k' | 'Rp 200k+';
export type EventType = 'Concert' | 'Exhibition' | 'Festival';

export interface MenuItem {
  name: string;
  price: string;
  image: string;
}

export interface Spot {
  id: string;
  name: string;
  category: Category;
  district: District;
  lat_long: [number, number];
  curator_note: string;
  wfc_score: number;
  noise_level: NoiseLevel;
  price_range: PriceRange;
  price_level: 1 | 2 | 3;
  images: string[];
  ambiance_images?: string[];
  love_count: number;
  distance_km?: number;
  menu_recommendations?: MenuItem[];
  tags?: string[];
  insider_tips?: InsiderTip[];
}

export interface InsiderTip {
  name: string;
  avatar: string;
  tip: string;
  date?: string;
  fallbackAvatar?: string;
}

export interface AppEvent {
  id: string;
  title: string;
  type: EventType;
  venue_name: string;
  map_url: string;
  start_date: string;
  price_display: string;
  ticket_url: string;
  image: string;
  description: string;
  additional_images?: string[];
  concert_map?: string;
  ticket_prices?: { category: string; price: string; available: boolean }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  type: 'Quick Hits' | 'Deep Dive';
  summary: string;
  content: string;
  contentBlocks?: { type: 'text' | 'image' | 'heading'; content: string }[];
  image: string;
  date: string;
  author?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  loved_spots: string[];
  my_tips: { spot_id: string; text: string; date: string }[];
  avatar: string;
}

export const MOCK_SPOTS: Spot[] = [
  {
    id: '1',
    name: 'Kopi Tuku - Cipete',
    category: 'Cafe',
    district: 'South Jakarta',
    lat_long: [-6.277, 106.8],
    curator_note: 'The pioneer of es kopi susu gula aren. Fast-paced, grab-and-go vibe. Not for lingering, but a must-visit for the culture.',
    wfc_score: 1,
    noise_level: 'Moderate',
    price_range: 'Rp 20k - 50k',
    price_level: 1,
    images: [
      'https://drive.google.com/uc?export=download&id=1e51M3lKqKU2-EiREJJtk9xMUJhGrWIT6',
      'https://drive.google.com/uc?export=download&id=1_lHGGGGDNdKJ9892Mg0vcSpXkaSPQMrz',
      'https://drive.google.com/uc?export=download&id=1owUz57upLdiIsy-fiTTAYSkgCEsGyhW'
    ],
    love_count: 1245,
    distance_km: 0.8,
    tags: ['wfc'],
    menu_recommendations: [
      { name: 'Es Kopi Susu Tetangga', price: 'Rp 20.000', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Donut Kampoeng', price: 'Rp 10.000', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: '2',
    name: '7 Speed Coffee',
    category: 'Cafe',
    district: 'South Jakarta',
    lat_long: [-6.25, 106.8],
    curator_note: 'Skater-owned, effortlessly cool space in Panglima Polim. Perfect for a morning flat white and some solid people watching.',
    wfc_score: 4,
    noise_level: 'Chill',
    price_range: 'Rp 50k - 100k',
    price_level: 2,
    images: [
      '/assets/7Speed/speed2.png',
      '/assets/7Speed/speed1.png',
      '/assets/7Speed/speed3.png',
      '/assets/7Speed/speed4.png',
      '/assets/7Speed/speed5.png',
      '/assets/7Speed/speed6.png',
      '/assets/7Speed/speed7.png',
      '/assets/7Speed/speed8.png',
      '/assets/7Speed/speed9.png',
      '/assets/7Speed/speed10.webp',
      '/assets/7Speed/speed11.webp',
      '/assets/7Speed/speed12.webp',
      '/assets/7Speed/speed13.webp',
      '/assets/7Speed/speed14.webp',
      '/assets/7Speed/speed15.webp',
      '/assets/7Speed/speed16.webp',
      '/assets/7Speed/speed17.webp',
      '/assets/7Speed/speed18.webp',
      '/assets/7Speed/speed19.webp',
      '/assets/7Speed/speed20.webp',
      '/assets/7Speed/speed21.webp'
    ],
    ambiance_images: [
      '/assets/7Speed/speed1.png',
      '/assets/7Speed/speed2.png',
      '/assets/7Speed/speed3.png',
      '/assets/7Speed/speed4.png',
      '/assets/7Speed/speed5.png',
      '/assets/7Speed/speed6.png',
      '/assets/7Speed/speed7.png',
      '/assets/7Speed/speed8.png',
      '/assets/7Speed/speed9.png',
      '/assets/7Speed/speed10.webp',
      '/assets/7Speed/speed11.webp',
      '/assets/7Speed/speed12.webp',
      '/assets/7Speed/speed13.webp',
      '/assets/7Speed/speed14.webp',
      '/assets/7Speed/speed15.webp',
      '/assets/7Speed/speed16.webp',
      '/assets/7Speed/speed17.webp',
      '/assets/7Speed/speed18.webp',
      '/assets/7Speed/speed19.webp',
      '/assets/7Speed/speed20.webp',
      '/assets/7Speed/speed21.webp'
    ],
    love_count: 890,
    distance_km: 1.2,
    tags: ['wfc'],
    menu_recommendations: [
      { name: 'Flat White', price: 'Rp 45.000', image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Avocado Toast', price: 'Rp 65.000', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: '3',
    name: 'Hutan Kota by Plataran',
    category: 'Restaurant',
    district: 'Central Jakarta',
    lat_long: [-6.21, 106.8],
    curator_note: 'A lush oasis right inside GBK. Elevated Indonesian dining with spectacular views of the Jakarta skyline. Dress up a bit.',
    wfc_score: 2,
    noise_level: 'Moderate',
    price_range: 'Rp 200k+',
    price_level: 3,
    images: [
      'https://drive.google.com/uc?export=download&id=13IIqjDK8Rx8VmioFi0Gbu8HQJhZFrsWY',
      'https://drive.google.com/uc?export=download&id=11kmNkqSQlbGr8lGCxNCwWXqQJ72TM-Q9',
      'https://drive.google.com/uc?export=download&id=1FiJt8D5dNhQ8w05nxgTerj4NkG1FgAI'
    ],
    love_count: 2100,
    distance_km: 3.5,
    tags: [],
    menu_recommendations: [
      { name: 'Bebek Manggis', price: 'Rp 180.000', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80' },
      { name: 'Nasi Goreng Plataran', price: 'Rp 140.000', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: '4',
    name: 'Zodiac',
    category: 'Bar',
    district: 'South Jakarta',
    lat_long: [-6.22, 106.8],
    curator_note: 'Audiophile listening bar by early evening, sweaty dancefloor by midnight. The cocktails are serious, the sound system is unmatched.',
    wfc_score: 1,
    noise_level: 'Loud',
    price_range: 'Rp 100k - 200k',
    price_level: 3,
    images: [
      '/assets/Zodiac/zod4.webp',
      '/assets/Zodiac/zod1.webp',
      '/assets/Zodiac/zod2.webp',
      '/assets/Zodiac/zod3.webp',
      '/assets/Zodiac/zod5.webp',
      '/assets/Zodiac/zod7.webp',
      '/assets/Zodiac/zod8.webp',
      '/assets/Zodiac/zod9.webp',
      '/assets/Zodiac/zod10.webp',
      '/assets/Zodiac/zod11.webp',
      '/assets/Zodiac/zod12.webp',
      '/assets/Zodiac/zod13.webp',
      '/assets/Zodiac/zod14.webp',
      '/assets/Zodiac/zod15.webp',
      '/assets/Zodiac/zod16.webp',
      '/assets/Zodiac/zod17.webp',
      '/assets/Zodiac/zod18.webp',
      '/assets/Zodiac/zod19.webp'
    ],
    ambiance_images: [
      '/assets/Zodiac/zod1.webp',
      '/assets/Zodiac/zod2.webp',
      '/assets/Zodiac/zod3.webp',
      '/assets/Zodiac/zod4.webp',
      '/assets/Zodiac/zod5.webp',
      '/assets/Zodiac/zod7.webp',
      '/assets/Zodiac/zod8.webp',
      '/assets/Zodiac/zod9.webp',
      '/assets/Zodiac/zod10.webp',
      '/assets/Zodiac/zod11.webp',
      '/assets/Zodiac/zod12.webp',
      '/assets/Zodiac/zod13.webp',
      '/assets/Zodiac/zod14.webp',
      '/assets/Zodiac/zod15.webp',
      '/assets/Zodiac/zod16.webp',
      '/assets/Zodiac/zod17.webp',
      '/assets/Zodiac/zod18.webp',
      '/assets/Zodiac/zod19.webp'
    ],
    love_count: 3400,
    distance_km: 2.1,
    tags: ['late-night'],
    menu_recommendations: [
      { name: 'Tokyo Highball', price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80' },
      { name: 'Truffle Fries', price: 'Rp 85.000', image: '/assets/truffle-fries.jpg' }
    ]
  },
  {
    id: '5',
    name: 'Little Salt Bread',
    category: 'Bakery',
    district: 'South Jakarta',
    lat_long: [-6.24, 106.8],
    curator_note: 'Hidden gem in Senopati area. Known for their signature freshly baked shio pan (salt bread) with a crispy bottom and buttery center.',
    wfc_score: 3,
    noise_level: 'Chill',
    price_range: 'Rp 50k - 100k',
    price_level: 2,
    images: [
      '/assets/Little/little6.webp',
      '/assets/Little/little1.webp',
      '/assets/Little/little2.webp',
      '/assets/Little/little3.webp',
      '/assets/Little/little4.webp',
      '/assets/Little/little5.webp',
      '/assets/Little/little7.webp',
      '/assets/Little/little8.webp',
      '/assets/Little/little9.webp',
      '/assets/Little/little0.png'
    ],
    ambiance_images: [
      '/assets/Little/little1.webp',
      '/assets/Little/little2.webp',
      '/assets/Little/little3.webp',
      '/assets/Little/little4.webp',
      '/assets/Little/little5.webp',
      '/assets/Little/little7.webp',
      '/assets/Little/little8.webp',
      '/assets/Little/little9.webp',
      '/assets/Little/little0.png'
    ],
    love_count: 560,
    distance_km: 1.5,
    tags: ['trending'],
    menu_recommendations: [
      { name: 'Original Salt Bread', price: 'Rp 25.000', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=600&q=80' },
      { name: 'Truffle Salt Bread', price: 'Rp 35.000', image: '/assets/Little/little6.webp' }
    ],
    insider_tips: [
      {
        name: 'Rara T.',
        avatar: '/assets/avatars/rara.jpg',
        fallbackAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        tip: "Don't come after 4 PM on a weekend, you won't get a seat."
      },
      {
        name: 'Bimo',
        avatar: '/assets/avatars/bimo.jpg',
        fallbackAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        tip: 'Their matcha latte is secretly the best item on the menu.'
      }
    ]
  },
  {
    id: '6',
    name: 'Daitokyo Sakaba',
    category: 'Izakaya',
    district: 'South Jakarta',
    lat_long: [-6.242, 106.801],
    curator_note: 'Moody subterranean aesthetic, dark timber private booths, authentic Japanese salaryman after-work atmosphere.',
    wfc_score: 1,
    noise_level: 'Loud',
    price_range: 'Rp 100k - 200k',
    price_level: 3,
    images: [
      '/assets/Daitokyo/dai1.png',
      '/assets/Daitokyo/dai2.png',
      '/assets/Daitokyo/dai3.png',
      '/assets/Daitokyo/dai4.png',
      '/assets/Daitokyo/dai5.png',
      '/assets/Daitokyo/dai6.png',
      '/assets/Daitokyo/dai7.png',
      '/assets/Daitokyo/dai8.png',
      '/assets/Daitokyo/dai9.png',
      '/assets/Daitokyo/dai10.png',
      '/assets/Daitokyo/dai11.webp',
      '/assets/Daitokyo/dai12.jpg',
      '/assets/Daitokyo/dai13.webp',
      '/assets/Daitokyo/dai14.jpg'
    ],
    ambiance_images: [
      '/assets/Daitokyo/dai2.png',
      '/assets/Daitokyo/dai3.png',
      '/assets/Daitokyo/dai4.png',
      '/assets/Daitokyo/dai5.png',
      '/assets/Daitokyo/dai6.png',
      '/assets/Daitokyo/dai7.png',
      '/assets/Daitokyo/dai8.png',
      '/assets/Daitokyo/dai9.png',
      '/assets/Daitokyo/dai10.png',
      '/assets/Daitokyo/dai11.webp',
      '/assets/Daitokyo/dai12.jpg',
      '/assets/Daitokyo/dai13.webp',
      '/assets/Daitokyo/dai14.jpg'
    ],
    love_count: 890,
    distance_km: 0.5,
    tags: ['late-night'],
    menu_recommendations: [
      { name: 'Gyutan Don', price: 'Rp 120.000', image: 'https://images.unsplash.com/photo-1554475900-0a0397e06a30?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: '7',
    name: 'Mr. Egg',
    category: 'Diner',
    district: 'South Jakarta',
    lat_long: [-6.243, 106.802],
    curator_note: 'Bright neon-lit modern retro diner, upbeat lo-fi hip hop, clean white-and-metallic aesthetic, casual midnight hangout.',
    wfc_score: 2,
    noise_level: 'Moderate',
    price_range: 'Rp 50k - 100k',
    price_level: 2,
    images: [
      '/assets/Mregg/egg3.png',
      '/assets/Mregg/egg4.png',
      '/assets/Mregg/egg14.png',
      '/assets/Mregg/egg15.png',
      '/assets/Mregg/egg16.png',
      '/assets/Mregg/egg17.png',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    ambiance_images: [
      '/assets/Mregg/egg3.png',
      '/assets/Mregg/egg14.png',
      '/assets/Mregg/egg15.png',
      '/assets/Mregg/egg16.png',
      '/assets/Mregg/egg17.png',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    love_count: 670,
    distance_km: 0.6,
    tags: ['late-night'],
    menu_recommendations: [
      { name: 'The OG Smashed Breakfast Burger', price: 'Rp 75.000', image: '/assets/Mregg/egg3.png' },
      { name: 'Truffle Garlic Tater Tots', price: 'Rp 42.000', image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=600&q=80' },
      { name: 'Classic Vanilla Malt Shake', price: 'Rp 48.000', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80' },
      { name: 'Pastrami & Sunny Egg Toast', price: 'Rp 68.000', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' }
    ],
    insider_tips: [
      {
        name: 'Dimas S.',
        avatar: '/assets/avatars/dimas.jpg',
        fallbackAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        tip: 'Best late-night smashed burger in Blok M. Counter seats give the ultimate retro diner feel.'
      },
      {
        name: 'Nadia P.',
        avatar: '/assets/avatars/nadia.jpg',
        fallbackAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        tip: 'Pair the burger with their garlic tots and milkshakes for the perfect midnight meal.'
      }
    ]
  },
  {
    id: '8',
    name: 'First Crack Coffee',
    category: 'Cafe',
    district: 'South Jakarta',
    lat_long: [-6.240, 106.805],
    curator_note: 'High-speed commercial enterprise network, ergonomic dining chairs, spacious communal worktables.',
    wfc_score: 5,
    noise_level: 'Chill',
    price_range: 'Rp 50k - 100k',
    price_level: 2,
    images: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80'
    ],
    love_count: 450,
    distance_km: 1.1,
    tags: ['wfc'],
    menu_recommendations: [
      { name: 'Raspberry Layered Coffee Mocha', price: 'Rp 65.000', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: '9',
    name: 'Scarlett\'s House',
    category: 'Cafe',
    district: 'South Jakarta',
    lat_long: [-6.245, 106.800],
    curator_note: 'Restored Dutch colonial residential facade, exposed warm red-brick masonry, vintage timber listening bar.',
    wfc_score: 3,
    noise_level: 'Moderate',
    price_range: 'Rp 100k - 200k',
    price_level: 3,
    images: [
      'https://drive.google.com/uc?export=download&id=1OpQRcqKQBA0DrxofFcrcY43BDPJXR_gG'
    ],
    love_count: 1250,
    distance_km: 0.9,
    tags: ['trending'],
    menu_recommendations: [
      { name: 'Original Poured Tiramisu', price: 'Rp 85.000', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80' }
    ]
  }
];

export const MOCK_EVENTS: AppEvent[] = [
  {
    id: 'e1',
    title: 'Trade Expo Indonesia 2026',
    type: 'Exhibition',
    venue_name: 'ICE BSD City',
    map_url: 'https://maps.google.com/?q=Indonesia+Convention+Exhibition+ICE+BSD',
    start_date: '2026-10-14',
    price_display: 'Free via B2B Pre-Registration',
    ticket_url: 'https://www.tradexpoindonesia.com/',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    description: 'Indonesia\'s largest export showcase, linking thousands of global buyers across 130+ nations with domestic manufacturers in agriculture, manufacturing, design, and green tech.',
    additional_images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'Professional Registration', price: 'Free', available: true }
    ]
  },
  {
    id: 'e2',
    title: 'Art Jakarta 2026',
    type: 'Exhibition',
    venue_name: 'JIExpo Kemayoran',
    map_url: 'https://maps.google.com/?q=JIExpo+Kemayoran+Jakarta',
    start_date: '2026-10-02',
    price_display: 'IDR 150k - 250k',
    ticket_url: 'https://artjakarta.com/',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=600&q=80',
    description: 'The flagship contemporary art fair of Southeast Asia, Art Jakarta brings together over 70 premier galleries from across Indonesia, the Asia-Pacific, and Europe.',
    additional_images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'General Public Daily', price: 'Rp 150.000', available: true },
      { category: 'VIP Vernissage', price: 'Rp 250.000', available: true }
    ]
  },
  {
    id: 'e3',
    title: 'LANY: a beautiful blur Tour',
    type: 'Concert',
    venue_name: 'Indonesia Arena, GBK',
    map_url: 'https://maps.google.com/?q=Indonesia+Arena+GBK+Jakarta',
    start_date: '2026-10-29',
    price_display: 'IDR 1,150k - 3,250k',
    ticket_url: 'https://lanyinjakarta.com/',
    image: 'https://images.unsplash.com/photo-1540039155733-d5f1d678666c?auto=format&fit=crop&w=600&q=80',
    description: 'Staged within the indoor arena bowl with a center proscenium configuration, surrounded by 360-degree tiered seating and dedicated ground-floor general admission standing pits.',
    additional_images: [
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'The Star VIP Experience', price: 'Rp 3.250.000', available: true },
      { category: 'Early Entry Festival', price: 'Rp 2.150.000', available: true },
      { category: 'General Festival', price: 'Rp 1.650.000', available: true },
      { category: 'CAT 1', price: 'Rp 1.950.000', available: false },
      { category: 'CAT 2', price: 'Rp 1.400.000', available: true },
      { category: 'CAT 3', price: 'Rp 1.150.000', available: true }
    ]
  },
  {
    id: 'e4',
    title: 'Andrea Bocelli: Romanza 30th Anniversary',
    type: 'Concert',
    venue_name: 'JIExpo New Hall Kemayoran',
    map_url: 'https://maps.google.com/?q=JIExpo+Kemayoran+Jakarta',
    start_date: '2026-11-03',
    price_display: 'From IDR 1,250k',
    ticket_url: 'https://www.tiket.com/en-id/to-do/bocelli-jakarta-bni',
    image: 'https://images.unsplash.com/photo-1507676184212-d0330a15673c?auto=format&fit=crop&w=600&q=80',
    description: 'Marking Bocelli’s only public metropolitan concert in Southeast Asia during 2026, the performance celebrates 30 years of his breakthrough Romanza album, drawing cultural patrons and international visitors across the Indo-Pacific.',
    additional_images: [
      'https://images.unsplash.com/photo-1529683647242-a8c6dbf620bd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'Diamond', price: 'Rp 15.500.000', available: true },
      { category: 'Platinum', price: 'Rp 13.000.000', available: true },
      { category: 'Gold', price: 'Rp 6.500.000', available: true },
      { category: 'Pearl', price: 'Rp 1.250.000', available: true }
    ]
  },
  {
    id: 'e5',
    title: 'Joyland Festival Jakarta 2026',
    type: 'Festival',
    venue_name: 'GBK Senayan',
    map_url: 'https://maps.google.com/?q=GBK+Baseball+Stadium+Jakarta',
    start_date: '2026-11-28',
    price_display: 'IDR 488k - 1,388k',
    ticket_url: 'https://joylandfest.com/',
    image: 'https://images.unsplash.com/photo-1533174000273-7d5904876fb6?auto=format&fit=crop&w=600&q=80',
    description: 'Curated by Plainsong Live, Joyland combines international alternative music headliners (e.g., Caribou, Slowdive) with curated cinema, workshops, and family creative spaces.',
    additional_images: [
      'https://images.unsplash.com/photo-1545224144-b38cd30dd488?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c092bb212fa?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'Presale 1 (2-Day Pass)', price: 'Rp 488.000', available: false },
      { category: 'Regular (2-Day Pass)', price: 'Rp 788.000', available: true },
      { category: 'VIP (2-Day Pass)', price: 'Rp 1.388.000', available: true }
    ]
  },
  {
    id: 'e6',
    title: 'We The Fest (WTF) 2026',
    type: 'Festival',
    venue_name: 'GBK Sports Complex, Senayan',
    map_url: 'https://maps.google.com/?q=Gelora+Bung+Karno+Jakarta',
    start_date: '2026-08-21',
    price_display: 'IDR 1,500k - 4,000k',
    ticket_url: 'https://wethefest.com/',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    description: 'Operated by Ismaya Live, WTF combines global pop and alternative rock headliners with food and fashion lifestyle experiences, catering to young metropolitan demographics.',
    additional_images: [
      'https://images.unsplash.com/photo-1533174000273-7d5904876fb6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'Early Entry 3-Day Pass', price: 'Rp 1.500.000', available: false },
      { category: 'General Admission 3-Day Pass', price: 'Rp 2.000.000', available: true },
      { category: 'Very Important Banana 3-Day Pass', price: 'Rp 3.800.000', available: true }
    ]
  },
  {
    id: 'e7',
    title: 'Pestapora 2026',
    type: 'Festival',
    venue_name: 'JIExpo Kemayoran',
    map_url: 'https://maps.google.com/?q=Gambir+Expo+JIExpo+Kemayoran',
    start_date: '2026-09-25',
    price_display: 'From IDR 300k',
    ticket_url: 'https://pestapora.com/',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=600&q=80',
    description: 'Managed by Boss Creator, Pestapora offers broad multi-genre curation that pairs mainstream icons with underground bands, drawing over 100,000 attendees over three days.',
    additional_images: [
      'https://images.unsplash.com/photo-1525683416215-09bdbebd9bde?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528645602411-dffe9c30e75a?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'Daily Pass', price: 'Rp 300.000', available: true },
      { category: 'Regular 3-Day Pass', price: 'Rp 750.000', available: true }
    ]
  },
  {
    id: 'e8',
    title: 'Art Jakarta Gardens 2026',
    type: 'Exhibition',
    venue_name: 'Hutan Kota by Plataran, GBK',
    map_url: 'https://maps.google.com/?q=Hutan+Kota+Plataran+GBK+Jakarta',
    start_date: '2026-05-05',
    price_display: 'IDR 100k - 150k',
    ticket_url: 'https://artjakarta.com/',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=600&q=80',
    description: 'Integrates contemporary sculpture and outdoor art installations into the metropolitan green belt, offering an accessible, public-facing alternative to traditional indoor gallery fairs.',
    additional_images: [
      'https://images.unsplash.com/photo-1518998053401-878950119eec?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=600&q=80'
    ],
    concert_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    ticket_prices: [
      { category: 'General Admission', price: 'Rp 100.000', available: true },
      { category: 'Weekend Pass', price: 'Rp 150.000', available: true }
    ]
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: '3 New Cafes in Blok M to Avoid the Crowd',
    type: 'Quick Hits',
    summary: 'Blok M is busier than ever. Here are three hidden spots where you can actually hear yourself think.',
    content: 'Finding a quiet spot in Blok M during the weekend is like finding a needle in a haystack. But fear not, we have scoured the area and found three brand-new cafes tucked away from the main streets.\n\n1. Kopi Sepi - A minimalist sanctuary with no Wi-Fi, encouraging you to actually read a book.\n2. The Backroom - Hidden behind a convenience store, offering artisanal pour-overs.\n3. Sunyi - A completely silent cafe where ordering is done via sign language or written notes.',
    contentBlocks: [
      { type: 'text', content: 'Finding a quiet spot in Blok M during the weekend is like finding a needle in a haystack. The streets are packed, the trendy spots have hour-long waitlists, and you can barely hear the barista call your name over the thumping playlists. But fear not, we have scoured the area and found three brand-new, under-the-radar cafes tucked away from the main streets where you can finally catch your breath.' },
      
      { type: 'heading', content: '1. Kopi Sepi' },
      { type: 'text', content: 'A minimalist sanctuary purposely designed with no Wi-Fi. The interior is clad in warm wood and soft indirect lighting, encouraging patrons to actually read a book or have an uninterrupted conversation. Their signature pour-over features beans exclusively sourced from West Java.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80' },
      
      { type: 'heading', content: '2. The Backroom' },
      { type: 'text', content: 'You have to walk through a seemingly normal convenience store and pull a specific lever to access this speakeasy-style cafe. The Backroom specializes in artisanal Japanese-style drip coffee and slow bar techniques. It is intimate, dimly lit, and perfect for a late-afternoon reset.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80' },
      
      { type: 'heading', content: '3. Sunyi' },
      { type: 'text', content: 'A completely silent cafe where ordering is done via sign language or written notes. It is a beautiful initiative that employs deaf baristas, creating an incredibly peaceful atmosphere. The air here feels remarkably still, making it the ultimate spot to focus, meditate, or simply escape the urban chaos outside.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80' },
      
      { type: 'text', content: 'Next time you find yourself overwhelmed by the crowds at M Bloc or the main intersection, take a slight detour. These spots prove that Blok M still holds a few well-kept secrets for those willing to look.' }
    ],
    image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&w=600&q=80',
    date: '2026-09-02',
    author: 'Reza Aditya'
  },
  {
    id: 'n2',
    title: 'The Unstoppable Rise of Listening Bars',
    type: 'Deep Dive',
    summary: 'From Senopati to Menteng, audiophile bars are changing how Jakarta spends its Friday nights.',
    content: 'The era of shouting over blown-out club speakers is fading. In its place, a new wave of venues prioritizing acoustic perfection and curated vinyl collections is taking over Jakarta. \n\nVenues like Zodiac and Houma have proven that Jakartans are hungry for high-fidelity sound paired with high-quality cocktails. This deep dive explores the acoustic engineering behind these spaces and interviews the founders leading the sonic revolution.',
    contentBlocks: [
      { type: 'text', content: 'The era of shouting over blown-out club speakers is fading. In its place, a new wave of venues prioritizing acoustic perfection and curated vinyl collections is taking over Jakarta. Venues like Zodiac and Houma have proven that Jakartans are hungry for high-fidelity sound paired with high-quality cocktails.' },
      { type: 'heading', content: 'A Sonic Revolution' },
      { type: 'text', content: 'Listening bars, a concept originating from 1950s Tokyo, focus on creating an environment where the music is the main event rather than background noise. The acoustic engineering in these new Jakarta spots is meticulous. Padded walls, custom-built wooden speaker enclosures, and vintage McIntosh amplifiers ensure that every vinyl record sounds as warm and layered as the artist intended.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: 'Where to Experience It' },
      { type: 'text', content: 'If you want to experience this yourself, start with Houma in Senopati for an intimate, jazz-focused evening. For a slightly more energetic vibe with a rotating cast of local DJs playing everything from City Pop to rare Indonesian funk, Zodiac in the Gunawarman area remains the gold standard.' },
      { type: 'text', content: 'These spaces ask patrons to do something increasingly rare in our hyper-connected world: sit down, keep the conversation at a low murmur, and truly listen.' }
    ],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    date: '2026-08-28',
    author: 'Sarah Wijaya'
  },
  {
    id: 'n3',
    title: 'Top 5 Hidden Spots in Glodok',
    type: 'Deep Dive',
    summary: 'Explore the narrow alleys of Jakarta\'s Chinatown to uncover legendary street food and secret tea houses.',
    content: 'Glodok is more than just a historical district; it\'s a labyrinth of culinary secrets. In this guide, we take you off the main roads to discover legendary Hainanese chicken rice hidden behind electronics stores and ancient tea houses that have been serving the same brew for decades.',
    contentBlocks: [
      { type: 'text', content: 'Glodok is more than just a historical district; it\'s a labyrinth of culinary secrets. While many visitors stick to the main road of Pantjoran, the real treasures are found deep within the narrow, winding alleys, where time seems to have stood still for the past half-century.' },
      { type: 'heading', content: '1. The Secret Tea House' },
      { type: 'text', content: 'Tucked away on the second floor above a bustling traditional market, this tea house has been operated by the same family for over 60 years. There is no sign outside—you just have to know which staircase to climb. Once inside, you are greeted by the aroma of aged Pu-erh and Tieguanyin, served in delicate porcelain cups that have survived generations.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: '2. Legendary Hainanese Chicken Rice' },
      { type: 'text', content: 'Located right behind an old electronics repair shop, this humble stall serves some of the most authentic Hainanese chicken rice in the city. The chicken is poached to absolute perfection, creating a gelatinous skin and incredibly tender meat. Accompanied by fragrant rice cooked in chicken fat and ginger, it is no surprise they sell out by 11 AM every single day.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: '3. Gang Gloria\'s Coffee Shop' },
      { type: 'text', content: 'A visit to Glodok isn\'t complete without stopping by Gang Gloria. Right at the intersection, you will find Kopi Es Tak Kie. Established in 1927, it serves arguably the best iced milk coffee in West Jakarta. The classic, no-frills interior and the perfectly balanced, strong coffee make it a timeless institution.' },
      { type: 'text', content: 'Next weekend, skip the modern malls and take a walk through Glodok. The flavors here tell the story of Jakarta\'s rich cultural tapestry in ways that no modern restaurant ever could.' }
    ],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    date: '2026-08-20',
    author: 'Kelvin Lee'
  },
  {
    id: 'n4',
    title: 'Late Night Eats: Beyond Nasi Goreng',
    type: 'Quick Hits',
    summary: 'When the midnight cravings hit, here is where to find the best late-night comfort food in the city.',
    content: 'Tired of the usual midnight Nasi Goreng? We explored the city\'s 24-hour diners, secret noodle spots, and late-night dim sum joints that are keeping Jakarta\'s night owls well-fed.',
    contentBlocks: [
      { type: 'text', content: 'Tired of the usual midnight Nasi Goreng? We explored the city\'s 24-hour diners, secret noodle spots, and late-night dim sum joints that are keeping Jakarta\'s night owls well-fed.' },
      { type: 'heading', content: '1. 24-Hour Dim Sum at HAKA' },
      { type: 'text', content: 'Forget fast food. The new trend for night owls is steaming baskets of har gow and salted egg pao at 3 AM in the heart of Senopati. HAKA Dimsum offers a bustling, energetic vibe even when the rest of the city is asleep.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: '2. All-Night American Diner' },
      { type: 'text', content: 'Mr. Egg in Blok M is bringing the classic American diner experience to Jakarta. With bright neon lights, lo-fi hip hop on the speakers, and a menu featuring truffle tater tots and smashed breakfast burgers, it is the perfect spot for a post-party cooldown.' },
      { type: 'image', content: '/assets/Mregg/egg4.png' },
      { type: 'heading', content: '3. Late Night Noodles' },
      { type: 'text', content: 'Demie Bakmie 69 serves up springy noodles and rich duck broth until the early hours. Tucked away on a mezzanine, it feels like a secret haven for those who need a hearty, warm bowl before calling it a night.' }
    ],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    date: '2026-08-15',
    author: 'Amanda Tan'
  },
  {
    id: 'n5',
    title: 'The Ultimate Guide to Jakarta\'s Car Free Day',
    type: 'Deep Dive',
    summary: 'Everything you need to know to make the most out of Sunday mornings on Sudirman-Thamrin.',
    content: 'Car Free Day (CFD) has evolved from a simple environmental initiative into a massive weekly urban festival. Here is our guide to navigating the crowds, finding the best street food, and joining the right running clubs.',
    contentBlocks: [
      { type: 'text', content: 'Car Free Day (CFD) in Jakarta has evolved from a simple environmental initiative into a massive weekly urban festival. Every Sunday morning, the major arteries of Sudirman and Thamrin are closed to motorized vehicles, transforming into a playground for cyclists, runners, and food enthusiasts.' },
      { type: 'heading', content: 'Where to Run and Ride' },
      { type: 'text', content: 'If you are looking for a serious workout, start early. The roads open at 6:00 AM, and by 7:30 AM, it becomes more of a walking crowd. The stretch from the Senayan roundabout to the Hotel Indonesia (HI) roundabout offers the clearest paths for cyclists.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1570535308693-8bc10134e183?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: 'The Breakfast Hunt' },
      { type: 'text', content: 'The real highlight of CFD is the food. The side streets around Sarinah and FX Sudirman turn into impromptu culinary markets. Look out for the legendary Bubur Ayam stalls and the freshly steamed Kue Putu.' },
      { type: 'text', content: 'Whether you are there to break a sweat or just to grab breakfast and people-watch, CFD remains one of the best ways to experience the communal spirit of Jakarta.' }
    ],
    image: 'https://images.unsplash.com/photo-1596766467380-4d5718df2d2e?auto=format&fit=crop&w=600&q=80',
    date: '2026-08-10',
    author: 'Budi Santoso'
  },
  {
    id: 'n6',
    title: 'Revival of Taman Ismail Marzuki',
    type: 'Quick Hits',
    summary: 'The iconic cultural center has reopened its doors, bringing a new wave of art exhibitions and theater to Cikini.',
    content: 'After years of extensive renovations, Taman Ismail Marzuki (TIM) in Cikini has finally fully reopened. We explored the new architectural marvels and the upcoming slate of independent film screenings and art galleries.',
    contentBlocks: [
      { type: 'text', content: 'After years of extensive renovations, Taman Ismail Marzuki (TIM) in Cikini has finally fully reopened. The iconic cultural center has been transformed into a modern, multi-layered architectural marvel, breathing new life into Jakarta\'s art scene.' },
      { type: 'heading', content: 'The New Library' },
      { type: 'text', content: 'The standout feature of the new TIM is the Jakarta Public Library. With its cascading wooden shelves, expansive reading areas, and floor-to-ceiling windows, it has quickly become a favorite spot for students and creatives. It is not just a place for books; it is a beautifully designed public space.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: 'Exhibitions and Theater' },
      { type: 'text', content: 'The Planetarium has received a major technological upgrade, and the surrounding galleries are currently hosting a rotating selection of contemporary Indonesian art. If you are looking for weekend plans, checking out a play or an indie film screening at TIM should be at the top of your list.' }
    ],
    image: 'https://images.unsplash.com/photo-1571217036683-17eb9c2c61d5?auto=format&fit=crop&w=600&q=80',
    date: '2026-08-05',
    author: 'Nadia Putri'
  },
  {
    id: 'n7',
    title: 'Matcha & Tea Bars: South Jakarta\'s New Afternoon Ritual',
    type: 'Deep Dive',
    summary: 'A new wave of minimalist tea ateliers in Panglima Polim and Dharmawangsa is challenging Jakarta\'s coffee dominance.',
    content: 'Specialty green tea sourced directly from Uji and Shizuoka is carving out its own territory in South Jakarta. From ceremonial whisking tables to matcha-infused Basque cheesecakes, explore where Jakartans are finding serene midday resets.',
    contentBlocks: [
      { type: 'text', content: 'For over a decade, South Jakarta has lived and breathed third-wave coffee. But over the last six months, a quiet revolution has taken root along the tree-lined streets of Panglima Polim and Dharmawangsa: ceremonial matcha bars.' },
      { type: 'heading', content: 'The Philosophy of Single-Origin Cultivars' },
      { type: 'text', content: 'Unlike commercial matcha lattes loaded with artificial syrups, these new sanctuaries treat green tea with the solemnity of fine wine. Patrons can sample single-cultivar teas like Okumidori and Samidori, whisked fresh with bamboo chasen right before their eyes.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: 'Top Spots to Unwind' },
      { type: 'text', content: 'Head to Chaya in Dharmawangsa for quiet tatami-inspired booths, or visit Ocha Studio in Melawai for iced ceremonial matcha paired with yuzu madeleines. The unhurried tempo offers the perfect sanctuary from the bustling metropolis.' }
    ],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    date: '2026-07-29',
    author: 'Karina Salim'
  },
  {
    id: 'n8',
    title: 'Vintage Hunting in Pasar Santa: What\'s Worth Buying',
    type: 'Quick Hits',
    summary: 'The upper floor of Pasar Santa has reinvented itself once again. Here is your treasure hunting guide for vinyl, cameras, and apparel.',
    content: 'Long after the initial culinary hype subsided, Pasar Santa\'s second floor has matured into a thriving enclave of passionate collectors. From Japanese pressed jazz records to refurbished Olympus 35mm rangefinders, here is where to look.',
    contentBlocks: [
      { type: 'text', content: 'Long after the initial culinary hype subsided, Pasar Santa\'s upper floor has matured into an authentic bohemian bazaar. It is now home to dedicated vinyl crate diggers, analog camera restorers, and curated thrift purveyors.' },
      { type: 'heading', content: '1. Vinyl Crate Digging at Substore' },
      { type: 'text', content: 'Substore remains the holy grail for collectors of classic Indonesian 70s rock, Japanese City Pop, and underground post-punk. The staff know their catalogs intimately and are always willing to spin a record on their listening deck.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80' },
      { type: 'heading', content: '2. Restored Point-and-Shoot Cameras' },
      { type: 'text', content: 'Analog photography enthusiasts will love the tiny glass booths tucked in the corner aisles. You will find fully serviced Canon Sure Shots, Yashica T-series, and fresh rolls of Kodak Portra and Ilford black-and-white film.' }
    ],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    date: '2026-07-18',
    author: 'Rian Pratama'
  },
  {
    id: 'n9',
    title: 'Rooftop Sundowners in SCBD: Golden Hour Elevated',
    type: 'Quick Hits',
    summary: 'Where to catch breathtaking sunset views as the high-rises illuminate against the Jakarta evening sky.',
    content: 'As the humid afternoon transitions into evening, there is nothing quite like watching the Sudirman skyline transition from dusk to twilight. Here are the premier vantage points for aperitifs and city vistas.',
    contentBlocks: [
      { type: 'text', content: 'As the humid afternoon transitions into evening, there is nothing quite like watching the Sudirman skyline transition from warm amber into illuminated glass towers. Finding the right high-altitude terrace makes all the difference.' },
      { type: 'heading', content: 'Vantage Points Above the Skyline' },
      { type: 'text', content: 'Whether you prefer craft botanical gin tonics or non-alcoholic seasonal spritzers, venues such as Henshin and Alto offer panoramic glass walls that showcase Jakarta’s kinetic urban beauty from 50 floors up.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80',
    date: '2026-07-10',
    author: 'Sarah Wijaya'
  },
  {
    id: 'n10',
    title: 'The Independent Coffee Roasters of Kota Tua',
    type: 'Deep Dive',
    summary: 'Historic Dutch-era colonial arcades are finding new vitality through artisanal micro-roasters.',
    content: 'Beyond the tourist crowds of Fatahillah Square, independent roasters are restoring neglected heritage buildings into aromatic coffee laboratories, celebrating indigenous beans from Aceh Gayo to Flores Bajawa.',
    contentBlocks: [
      { type: 'text', content: 'Kota Tua is undergoing a subtle, flavor-driven renaissance. Rather than commercial tourist franchises, independent micro-roasters are moving into soaring brick archways and Dutch colonial buildings, bringing modern extraction science to centuries-old architecture.' },
      { type: 'heading', content: 'Single Origin Terroirs' },
      { type: 'text', content: 'These spots roast on-site in small 2-kilogram batches, celebrating rare micro-lots from North Sumatra, Bali Kintamani, and Toraja. Enjoying a slow pour-over beneath high teak ceilings offers an unmatched sense of place.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    date: '2026-06-28',
    author: 'Kelvin Lee'
  }
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Andi S.',
  email: 'andi@example.com',
  loved_spots: ['2', '4'],
  my_tips: [{ spot_id: '5', text: 'Get the burnt cheesecake early!', date: '2026-09-01' }],
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
};
