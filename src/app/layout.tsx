import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zero-Defect OS | Konzept-Präsentation',
  description: 'Professionelle Webentwicklung als Konzept-Präsentation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-gray-50 text-gray-900">
        {/* Demo Banner */}
        <div className="bg-yellow-100 border-b border-yellow-200 text-yellow-800 text-center text-sm py-2 px-4 font-medium">
          ⚠️ Dies ist ein technisches Konzept / eine Demo-Präsentation. Noch nicht live geschaltet.
        </div>

        {children}
      </body>
    </html>
  );
}
