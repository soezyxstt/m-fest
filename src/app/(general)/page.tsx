import Events from '@/components/events';
import Faqs from '@/components/faqs';
import Hero from '@/components/hero';
import LenisWrapper from '@/components/lenis';
import Sponsor from '@/components/sponsor';
import Timeline from '@/components/timeline';

export default function Home() {
  return (
    <>
      <LenisWrapper />
      <Hero />
      <Timeline />
      <Events />
      <Sponsor />
      <Faqs />
    </>
  );
}
