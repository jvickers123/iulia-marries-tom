import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Iulia Marries Tom',
  description: "All you need to know about Iulia and Tom's wedding. RSVP here!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <div id="overlays" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
