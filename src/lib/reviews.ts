import { google } from 'googleapis';

// ✅ ZERO-DEFECT: Google Sheets Konfiguration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '';
const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET || 'Reviews';

export interface Review {
  id: string;
  name: string;
  displayDate: string;
  isoDate: string;
  text: string;
  rating: number;
  source: string;
}

// ✅ CACHE: Reviews werden einmal pro Build abgerufen und gecacht
let cachedReviews: Review[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 Stunde

export async function getReviews(): Promise<Review[]> {
  // Cache prüfen
  if (cachedReviews && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedReviews;
  }

  try {
    // Google Sheets Client initialisieren
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Daten aus Tabelle abrufen
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.warn('[REVIEWS] Keine Daten in Google Sheets gefunden.');
      return [];
    }

    // Erste Zeile als Header überspringen (Name, Datum, Text, Rating, Source)
    const dataRows = rows.slice(1);

    const reviews: Review[] = dataRows
      .map((row: string[], index: number) => ({
        id: `review-${index + 1}`,
        name: row[0] || 'Anonym',
        displayDate: row[1] || 'vor kurzem',
        isoDate: row[2] || new Date().toISOString().split('T')[0],
        text: row[3] || '',
        rating: parseInt(row[4]) || 5,
        source: row[5] || 'Google',
      }))
      .filter((r) => r.text.length > 0); // Leere Einträge filtern

    // Cache aktualisieren
    cachedReviews = reviews;
    cacheTimestamp = Date.now();

    return reviews;
  } catch (error) {
    console.error('[REVIEWS] Fehler beim Abrufen der Daten:', error);
    // Fallback: Statische Daten, falls Google Sheets nicht erreichbar ist
    return getFallbackReviews();
  }
}

// ✅ FALLBACK: Statische Reviews (falls API nicht erreichbar)
function getFallbackReviews(): Review[] {
  return [
    {
      id: 'fallback-1',
      name: 'Thomas M.',
      displayDate: 'vor 2 Wochen',
      isoDate: '2023-10-15',
      text: 'Super freundlicher Service! Mein Hermes-Paket war schnell gefunden.',
      rating: 5,
      source: 'Google',
    },
    {
      id: 'fallback-2',
      name: 'Sandra K.',
      displayDate: 'vor 1 Monat',
      isoDate: '2023-09-20',
      text: 'Der beste Kiosk in Liblar. Immer sauber, gut sortiert.',
      rating: 5,
      source: 'Google',
    },
    {
      id: 'fallback-3',
      name: 'Markus B.',
      displayDate: 'vor 2 Monaten',
      isoDate: '2023-08-10',
      text: 'Praktische Lage direkt am Bürgerplatz. Getränke sind immer schön kalt.',
      rating: 5,
      source: 'Google',
    },
  ];
}
