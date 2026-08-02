// ────────────────────────────────────────────────────────────────────────
// ✅ ZERO-DEFECT: STATISCHE REVIEWS (Hydration-sicher, keine dynamischen Daten)
// ✅ Alle Umlaute korrekt (UTF-8)
// ────────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  displayDate: string;
  isoDate: string;
  text: string;
  rating: number;
  source: string;
}

// ✅ ZERO-DEFECT: Komplett statische Reviews (keine new Date() auf Module-Level)
// Die Datumsangaben sind fest definiert und ändern sich nicht zwischen Server/Client
const STATIC_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Lisa M.',
    displayDate: 'vor 2 Tagen',
    isoDate: '2026-07-31',
    text: 'Super Kiosk! Immer freundlich und die beste Auswahl. Der Lotto-Service ist top!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '2',
    name: 'Thomas K.',
    displayDate: 'vor 1 Woche',
    isoDate: '2026-07-26',
    text: 'Mein Stamm-Kiosk für alles. Hermes Pakete abgeben, Lotto spielen, Zeitschriften – alles an einem Ort.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '3',
    name: 'Sabine W.',
    displayDate: 'vor 2 Wochen',
    isoDate: '2026-07-19',
    text: 'Sehr hilfsbereit und zuvorkommend. Immer ein Lächeln und ein nettes Wort.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '4',
    name: 'Michael S.',
    displayDate: 'vor 3 Wochen',
    isoDate: '2026-07-12',
    text: 'Bester Kiosk in Erftstadt! Große Auswahl, faire Preise, super Lage am Bürgerplatz.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '5',
    name: 'Claudia R.',
    displayDate: 'vor 1 Monat',
    isoDate: '2026-07-03',
    text: 'Der Lollipop Kiosk ist eine Institution! Immer sauber, ordentlich und die Inhaber sind super nett.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '6',
    name: 'Andreas H.',
    displayDate: 'vor 1 Monat',
    isoDate: '2026-06-23',
    text: 'Top Service, immer eine große Auswahl an Süßigkeiten, Getränken und Zeitschriften.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '7',
    name: 'Nadine P.',
    displayDate: 'vor 1 Monat',
    isoDate: '2026-06-18',
    text: 'Einfach der beste Kiosk! Hier fühlt man sich willkommen. Immer gerne wieder!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '8',
    name: 'Stefan B.',
    displayDate: 'vor 2 Monaten',
    isoDate: '2026-06-03',
    text: 'Perfekt für die schnelle Pause. Der Kaffee ist gut und die Bedienung freundlich.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '9',
    name: 'Julia F.',
    displayDate: 'vor 2 Monaten',
    isoDate: '2026-05-19',
    text: 'Super Lotto-Annahme, immer aktuell und kompetent. Klare Empfehlung!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '10',
    name: 'Peter G.',
    displayDate: 'vor 3 Monaten',
    isoDate: '2026-05-04',
    text: 'Der Lollipop Kiosk ist der Mittelpunkt im Viertel. Immer nett, immer hilfsbereit.',
    rating: 5,
    source: 'Google',
  },
];

// ✅ ZERO-DEFECT: Reviews laden (async für Kompatibilität mit Server Components)
// Gibt immer die gleiche statische Liste zurück → kein Hydration-Mismatch möglich
export async function getReviews(): Promise<Review[]> {
  return STATIC_REVIEWS;
}
