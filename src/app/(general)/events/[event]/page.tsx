import { SparklesCore } from '@/components/ui/sparkle';
import GradientText from '@/components/ui/text/gradient';
import { events, eventTitleFormater } from '@/lib/events';
import { redirect } from 'next/navigation';

export default async function EventPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const event = (await params).event;
  const i = events.findIndex(
    (e) =>
      eventTitleFormater(e.title) === eventTitleFormater(event.toLowerCase())
  );

  if (i < 0) {
    redirect('/404');
  }

  return (
    <main className='min-h-screen bg-[url("/landing.png")] bg-cover bg-center bg-fixed'>
      <section
        id='hero'
        className='h-screen flex justify-center items-center flex-col gap-6 relative text-white'
      >
        <div className='w-full absolute h-screen pointer-events-none'>
          <SparklesCore
            id='tsparticlesfullpage'
            background='transparent'
            minSize={0.6}
            maxSize={1.4}
            particleDensity={60}
            className='w-full h-full z-0'
            particleColor='#ad8cea'
          />
        </div>
        <h1 className='text-5xl md:text-7xl text-center max-w-8/10 md:max-w-2xl [font-family:var(--font-next-montserrat)] font-bold'>
          {events[i].title}
        </h1>
        <GradientText className='leading-normal'>Coming Soon</GradientText>
      </section>
    </main>
  );
}
