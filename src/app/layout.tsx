import type { Metadata } from 'next';
import './globals.css';
import { montserrat, onest, roboto } from '@/style/font';
import 'lenis/dist/lenis.css';

export const metadata: Metadata = {
  title: 'Mechanical Festival 2025',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${onest.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
