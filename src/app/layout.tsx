import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zero-Defect OS',
  description: 'Professionelle, fehlerresistente Webanwendung',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
