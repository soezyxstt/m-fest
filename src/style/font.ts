import { Montserrat, Onest, Roboto_Serif } from 'next/font/google';

export const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  adjustFontFallback: true,
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const roboto = Roboto_Serif({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  adjustFontFallback: true,
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const onest = Onest({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  adjustFontFallback: true,
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-onest',
});
