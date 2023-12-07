import { transport } from '@/utilities/fonts';
import type { Metadata } from 'next';

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
      <body className={transport.className}>{children}</body>
    </html>
  );
}
