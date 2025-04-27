import { SparklesCore } from '@/components/ui/sparkle';
import ClientPage from './clientPage';
import { cache } from 'react';
import GradientText from '@/components/ui/text/gradient';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/server/prisma';
import { redirect } from 'next/navigation';
import { EventName } from '@prisma/client';

const getRegistrations = unstable_cache(
  async (eventName: EventName) => await prisma.eventRegistration.findMany({
    where: {
      eventName: eventName,
    }
  }),
  ['getRegistrations'],
  { revalidate: 60 * 30 } // Set revalidate to 0 for immediate cache invalidation
)

export default async function EventPage({
  params,
}: Readonly<{
  params: Promise<{ event: string }>;
}>) {
  const { event } = await params;
  const capitalizedEvent = event
    .split(/\s/)
    .map(part =>
      part.includes('-')
        ? part.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('-')
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(' ');
  const now = cache(() => new Date())();

  const eventDate = new Date('2026-10-14T08:00:00Z'); // Example date
  const isEventOpen = now < eventDate;
  const registrations = await getRegistrations(event.replace(/-/g, '_').toUpperCase() as EventName);

  if (!['m-talks', 'm-expo'].includes(event.toLowerCase())) {
    redirect('/404')
  }

  if (!isEventOpen) {
    return (
      <section id='hero' className='h-screen flex justify-center items-center flex-col gap-6 relative text-white'>
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
        <GradientText className='leading-normal text-2xl md:text-5xl'>
          {capitalizedEvent} Registration is Closed
        </GradientText>
      </section>
    );
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <ClientPage event={capitalizedEvent} regs={registrations} />
    </main>
  );
}