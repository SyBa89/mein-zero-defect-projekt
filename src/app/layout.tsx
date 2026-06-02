import type { Metadata } from 'next';

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
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
