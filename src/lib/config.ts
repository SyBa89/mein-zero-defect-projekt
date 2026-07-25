// ✅ GOLDSTANDARD: Diese Datei dient nur noch als statischer Fallback.
// Die primäre Quelle der Wahrheit ist jetzt die Redis-Datenbank (via API).

export const KIOSK_CONFIG = {
  url: 'https://mein-zero-defect-projekt.vercel.app',
  // Die folgenden Werte werden von der API überschrieben, falls Redis verfügbar ist.
  // Sie dienen hier nur der Typsicherheit und als letzter Fallback.
  name: 'Kiosk Lollipop',
  phoneDisplay: '02235 9291160',
  phoneHref: 'tel:+4922359291160',
  address: 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683',
  facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
};
