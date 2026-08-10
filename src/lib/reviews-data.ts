export interface Review {
  name: string;
  initial: string;
  date: string;
  text: string;
}
export const TENANT_REVIEWS: Record<string, Review[]> = {
  kiosk: [
    {
      name: 'Thomas M.',
      initial: 'T',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Freundlicher Service, schnelle Paket-Abholung.',
    },
    {
      name: 'Sandra K.',
      initial: 'S',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Sauberer Laden, gut sortiert.',
    },
    {
      name: 'Markus B.',
      initial: 'M',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Praktische Lage, Getränke immer kalt.',
    },
  ],
  handwerk: [
    {
      name: 'Petra S.',
      initial: 'P',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Schnelle Hilfe bei Rohrbruch, faire Preise.',
    },
    {
      name: 'Wolfgang M.',
      initial: 'W',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Heizungseinbau mit Top-Beratung.',
    },
    {
      name: 'Sabine K.',
      initial: 'S',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Badsanierung in 5 Tagen, sauber.',
    },
  ],
  friseur: [
    {
      name: 'Julia R.',
      initial: 'J',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Perfekter Schnitt, tolle Beratung.',
    },
    {
      name: 'Michael H.',
      initial: 'M',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Moderner Style, faire Preise.',
    },
    {
      name: 'Anna L.',
      initial: 'A',
      date: 'Muster-Bewertung',
      text: 'Beispiel: Endlich ein Friseur, der zuhört.',
    },
  ],
};
