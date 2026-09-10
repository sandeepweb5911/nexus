import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Nexus - Standardized Frontier Intelligence Directory',
  description: 'Enterprise telemetry benchmarks, dynamic side-by-side comparison matrix, and developer intelligence platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#10131a] text-[#e0e2eb] min-h-screen flex flex-col antialiased selection:bg-[#8083ff] selection:text-[#0d0096]">
        {children}
      </body>
    </html>
  );
}
