import type { Metadata } from 'next';
import './globals.css';
import { montserrat, onest, roboto } from '@/style/font';
import 'lenis/dist/lenis.css';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: { default: 'Mechanical Festival 2025', template: '%s | M-Fest 2025' },
  description: 'Innovate Ideas. Create Impact',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head className="">
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${onest.className} antialiased`}
      >
        {children}
        <Toaster />
        <SpeedInsights/>
      </body>
    </html>
  );
}
