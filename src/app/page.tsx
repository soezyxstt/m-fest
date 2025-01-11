import Events from '@/components/events';
import Faqs from '@/components/faqs';
import Hero from '@/components/hero';
import LenisWrapper from '@/components/lenis';
import Timeline from '@/components/timeline';

export default function Home() {
  return (
    <main className='min-h-screen bg-[url("/landing.png")] bg-cover bg-center bg-fixed'>
      <LenisWrapper />
      <Hero />
      <Timeline />
      <Events />
      <Faqs />
    </main>
  );
}
