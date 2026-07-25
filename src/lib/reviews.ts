// ──────────────────────────────────────────────────────────────
// STATISCHE REVIEWS (Keine Google Sheets-Abhängigkeit)
// ──────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  displayDate: string;
  isoDate: string;
  text: string;
  rating: number;
  source: string;
}

const STATIC_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Lisa M.',
    displayDate: 'vor 2 Tagen',
    isoDate: '2026-07-22',
    text: 'Super Kiosk! Immer freundlich und die beste Auswahl. Der Lotto-Service ist top!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '2',
    name: 'Thomas K.',
    displayDate: 'vor 1 Woche',
    isoDate: '2026-07-16',
    text: 'Mein Stamm-Kiosk fuer alles. Hermes Pakete abgeben, Lotto spielen, Zeitschriften – alles an einem Ort.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '3',
    name: 'Sabine W.',
    displayDate: 'vor 2 Wochen',
    isoDate: '2026-07-10',
    text: 'Sehr hilfsbereit und zuvorkommend. Immer ein Laecheln und ein nettes Wort.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '4',
    name: 'Michael S.',
    displayDate: 'vor 3 Wochen',
    isoDate: '2026-07-03',
    text: 'Bester Kiosk in Erftstadt! Grosse Auswahl, faire Preise, super Lage am Buergerplatz.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '5',
    name: 'Claudia R.',
    displayDate: 'vor 1 Monat',
    isoDate: '2026-06-25',
    text: 'Der Lollipop Kiosk ist eine Institution! Immer sauber, ordentlich und die Inhaber sind super nett.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '6',
    name: 'Andreas H.',
    displayDate: 'vor 1 Monat',
    isoDate: '2026-06-20',
    text: 'Top Service, immer eine grosse Auswahl an Suessigkeiten, Getraenken und Zeitschriften.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '7',
    name: 'Nadine P.',
    displayDate: 'vor 1 Monat',
    isoDate: '2026-06-15',
    text: 'Einfach der beste Kiosk! Hier fuehlt man sich willkommen. Immer gerne wieder!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '8',
    name: 'Stefan B.',
    displayDate: 'vor 2 Monaten',
    isoDate: '2026-05-28',
    text: 'Perfekt fuer die schnelle Pause. Der Kaffee ist gut und die Bedienung freundlich.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '9',
    name: 'Julia F.',
    displayDate: 'vor 2 Monaten',
    isoDate: '2026-05-20',
    text: 'Super Lotto-Annahme, immer aktuell und kompetent. Klare Empfehlung!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '10',
    name: 'Peter G.',
    displayDate: 'vor 3 Monaten',
    isoDate: '2026-04-25',
    text: 'Der Lollipop Kiosk ist der Mittelpunkt im Viertel. Immer nett, immer hilfsbereit.',
    rating: 5,
    source: 'Google',
  },
];

export async function getReviews(): Promise<Review[]> {
  // Kleine Verzoegerung fuer bessere UX
  await new Promise((resolve) => setTimeout(resolve, 200));
  return STATIC_REVIEWS;
}
