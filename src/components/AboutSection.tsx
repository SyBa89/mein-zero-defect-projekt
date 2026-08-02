'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';
import FadeInWhenVisible from './motion/FadeInWhenVisible';

export default function AboutSection() {
  const { brand, contact, hermes } = CLIENT_CONFIG;

  // ✅ ZERO-DEFECT: Dynamisch - Prüft, ob Hermes in der Config aktiviert ist
  const hasHermes = hermes?.enabled ?? false;
  const serviceText = hasHermes ? ' und Hermes Paketshop' : '';

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInWhenVisible direction="up" duration={0.8}>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-6">
            Über uns
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.2} duration={0.8}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {brand.name} ist Ihr freundlicher Nachbarschaftskiosk{serviceText} im Herzen von{' '}
            {contact.address.city}. Wir befinden uns in der {contact.address.street},{' '}
            {contact.address.zip} {contact.address.city}, in der Nähe des Bahnhofs und weiterer
            lokaler Geschäfte.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.4} duration={0.8}>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Ob Sie morgens Ihre Zeitung holen, mittags einen schnellen Snack brauchen, Pakete
            versenden oder abends noch Getränke für den Feierabend kaufen möchten – wir sind für Sie
            da.{' '}
            {hasHermes &&
              'Als offizieller Hermes Paketshop bieten wir Ihnen zusätzlich alle Dienstleistungen rund um Paketversand, -abholung und Retouren. '}
            Schnell, freundlich und zu fairen Preisen.
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
