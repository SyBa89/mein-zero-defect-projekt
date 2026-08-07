import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Poppins, Montserrat, Roboto, Lora, Source_Sans_3 } from 'next/font/google';
import { getClientConfig } from '@/lib/config-loader';
import { generateSchemaOrg } from '@/lib/schema-generator';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

// ═══════════════════════════════════════════════════════════════
// Font Loading (Next.js Optimized)
// ═══════════════════════════════════════════════════════════════

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
});

// ═══════════════════════════════════════════════════════════════
// Dynamic Metadata Generation (Business-Aware SEO)
// ═══════════════════════════════════════════════════════════════

export async function generateMetadata(): Promise<Metadata> {
  const config = getClientConfig();
  const { brand, seo, contact, business } = config;

  const businessKeywords: Record<string, string[]> = {
    kiosk: ['Kiosk', 'Späti', 'Hermes Paketshop', 'Lotto', 'Getränke', contact.address.city],
    handwerk: ['Sanitär', 'Heizung', 'Klempner', 'Notdienst', 'Badsanierung', contact.address.city],
    arzt: ['Hausarzt', 'Allgemeinmedizin', 'Praxis', 'Vorsorge', contact.address.city],
  };

  const keywords = [...seo.keywords, ...(businessKeywords[business.type] || [])];

  return {
    metadataBase: new URL(config.url),
    title: {
      default: `${brand.name} | ${brand.slogan}`,
      template: `%s | ${brand.name}`,
    },
    description: seo.description,
    keywords: keywords,
    authors: [{ name: brand.legalName }],
    creator: brand.legalName,
    publisher: brand.legalName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: config.url,
      siteName: brand.name,
      title: `${brand.name} | ${brand.slogan}`,
      description: seo.description,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} | ${brand.slogan}`,
      description: seo.description,
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: config.url,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  };
}

// ═══════════════════════════════════════════════════════════════
// Root Layout (Server Component)
// ═══════════════════════════════════════════════════════════════

export default function RootLayout({ children }: { children: ReactNode }) {
  // ✅ Config wird EINMAL serverseitig geladen
  const config = getClientConfig();
  const schema = generateSchemaOrg(config);

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${roboto.variable} ${lora.variable} ${sourceSans.variable}`}
    >
      <head>
        {/* Schema.org JSON-LD for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased font-body bg-background text-text">
        {/* ✅ ConfigProvider erhält initialConfig Prop */}
        <ConfigProvider initialConfig={config}>
          <ThemeProvider>{children}</ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
