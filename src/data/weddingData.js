/* ═══════════════════════════════════════════════════════════════
   WEDDING DATA — All structured content in one place
   Easy to edit: dates, events, descriptions, venues
   ═══════════════════════════════════════════════════════════════ */

// Wedding countdown target: 30 November 2026, 4:00 PM IST
export const WEDDING_DATE = new Date('2026-11-30T16:00:00+05:30');

export const COUPLE = {
  bride: 'Shilpa',
  groom: 'Shailesh',
};

export const WEDDING_DAYS = [
  {
    day: 'Day One',
    date: '28 November 2026',
    dateShort: '28 Nov',
    events: [
      {
        id: 'carnival',
        name: 'Carnival',
        time: '9:00 AM',
        icon: '🎪',
        description: 'A joyful beginning to the celebrations, filled with colours, laughter and togetherness.',
        venue: null, // To be updated
        venueAddress: null,
        dressCode: null,
      },
      {
        id: 'sufi-night',
        name: 'Sufi Night',
        time: '9:00 PM',
        icon: '🎵',
        description: 'An enchanting evening of soulful music, warmth and celebration.',
        venue: null,
        venueAddress: null,
        dressCode: null,
      },
    ],
  },
  {
    day: 'Day Two',
    date: '29 November 2026',
    dateShort: '29 Nov',
    events: [
      {
        id: 'madap-muhurat',
        name: 'Madap Muhurat',
        time: '10:00 AM',
        icon: '🪔',
        description: 'A sacred beginning as the wedding rituals and blessings unfold.',
        venue: null,
        venueAddress: null,
        dressCode: null,
      },
      {
        id: 'cocktail-party',
        name: 'Cocktail Party',
        time: '9:00 PM',
        icon: '🥂',
        description: 'An elegant evening of cocktails, conversations, music and celebration.',
        venue: null,
        venueAddress: null,
        dressCode: null,
      },
    ],
  },
  {
    day: 'Day Three',
    date: '30 November 2026',
    dateShort: '30 Nov',
    events: [
      {
        id: 'wedding',
        name: 'The Wedding',
        time: '4:00 PM',
        icon: '💍',
        description: 'The moment we\'ve all been waiting for.',
        venue: null,
        venueAddress: null,
        dressCode: null,
        featured: true,
      },
    ],
  },
];

export const STORY_CHAPTERS = [
  {
    title: 'How It Began',
    text: 'Every love story has a beautiful beginning — ours started with a moment that changed everything.',
    placeholder: true,
  },
  {
    title: 'The Journey',
    text: 'Through laughter, adventures, and quiet moments together, our bond grew deeper with each passing day.',
    placeholder: true,
  },
  {
    title: 'The Proposal',
    text: 'A question whispered from the heart, answered with a lifetime of yes.',
    placeholder: true,
  },
  {
    title: 'Forever Begins',
    text: 'And now, surrounded by those we love, we begin the most beautiful chapter of all.',
    placeholder: true,
  },
];

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'story', label: 'Our Story', href: '#story' },
  { id: 'celebrations', label: 'Celebrations', href: '#celebrations' },
  { id: 'wardrobe', label: 'Wardrobe', href: '#wardrobe' },
  { id: 'gallery', label: 'Memories', href: '#gallery' },
  { id: 'family', label: 'Families', href: '#family' },
  { id: 'venue', label: 'Venue', href: '#venue' },
];

export const ALL_EVENTS_FLAT = WEDDING_DAYS.flatMap(day =>
  day.events.map(event => ({
    ...event,
    dayDate: day.date,
  }))
);
