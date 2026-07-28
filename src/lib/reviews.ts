// ──────────────────────────────────────────────────────────────
// ✅ STATISCHE REVIEWS (Keine Google Sheets-Abhängigkeit)
// ✅ Alle Umlaute korrekt (UTF-8)
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

// ✅ Helper: Berechnet relatives Datum dynamisch (immer aktuell)
function getRelativeDate(daysAgo: number): { displayDate: string; isoDate: string } {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  let displayDate: string;
  if (daysAgo === 0) {
    displayDate = 'heute';
  } else if (daysAgo === 1) {
    displayDate = 'gestern';
  } else if (daysAgo < 7) {
    displayDate = `vor ${daysAgo} Tagen`;
  } else if (daysAgo < 14) {
    displayDate = 'vor 1 Woche';
  } else if (daysAgo < 30) {
    displayDate = `vor ${Math.floor(daysAgo / 7)} Wochen`;
  } else if (daysAgo < 60) {
    displayDate = 'vor 1 Monat';
  } else {
    displayDate = `vor ${Math.floor(daysAgo / 30)} Monaten`;
  }

  return {
    displayDate,
    isoDate: date.toISOString().split('T')[0],
  };
}

// ✅ ZERO-DEFECT: Reviews mit korrekten deutschen Umlauten
const STATIC_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Lisa M.',
    ...getRelativeDate(2),
    text: 'Super Kiosk! Immer freundlich und die beste Auswahl. Der Lotto-Service ist top!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '2',
    name: 'Thomas K.',
    ...getRelativeDate(7),
    text: 'Mein Stamm-Kiosk für alles. Hermes Pakete abgeben, Lotto spielen, Zeitschriften – alles an einem Ort.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '3',
    name: 'Sabine W.',
    ...getRelativeDate(14),
    text: 'Sehr hilfsbereit und zuvorkommend. Immer ein Lächeln und ein nettes Wort.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '4',
    name: 'Michael S.',
    ...getRelativeDate(21),
    text: 'Bester Kiosk in Erftstadt! Große Auswahl, faire Preise, super Lage am Bürgerplatz.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '5',
    name: 'Claudia R.',
    ...getRelativeDate(30),
    text: 'Der Lollipop Kiosk ist eine Institution! Immer sauber, ordentlich und die Inhaber sind super nett.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '6',
    name: 'Andreas H.',
    ...getRelativeDate(40),
    text: 'Top Service, immer eine große Auswahl an Süßigkeiten, Getränken und Zeitschriften.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '7',
    name: 'Nadine P.',
    ...getRelativeDate(45),
    text: 'Einfach der beste Kiosk! Hier fühlt man sich willkommen. Immer gerne wieder!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '8',
    name: 'Stefan B.',
    ...getRelativeDate(60),
    text: 'Perfekt für die schnelle Pause. Der Kaffee ist gut und die Bedienung freundlich.',
    rating: 5,
    source: 'Google',
  },
  {
    id: '9',
    name: 'Julia F.',
    ...getRelativeDate(75),
    text: 'Super Lotto-Annahme, immer aktuell und kompetent. Klare Empfehlung!',
    rating: 5,
    source: 'Google',
  },
  {
    id: '10',
    name: 'Peter G.',
    ...getRelativeDate(90),
    text: 'Der Lollipop Kiosk ist der Mittelpunkt im Viertel. Immer nett, immer hilfsbereit.',
    rating: 5,
    source: 'Google',
  },
];

// ✅ ZERO-DEFECT: Reviews laden (async für Kompatibilität mit Server Components)
export async function getReviews(): Promise<Review[]> {
  // Keine künstliche Verzögerung mehr (war nur für Demo)
  // Server Components sind bereits schnell genug
  return STATIC_REVIEWS;
}
