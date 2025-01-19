'use client';

import { useScroll, useTransform } from 'motion/react';
import EventsCard from './event-card';
import { useRef, useState } from 'react';
import EventsStep from './event-step';
import { useWindowSize } from 'usehooks-ts';
import { motion } from 'motion/react';

export default function Events() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const { height } = useWindowSize();
  const size = ref.current?.getBoundingClientRect();
  const [isExpanded, setIsExpanded] = useState(false);
  const events = [
    {
      title: 'M-Care',
      desc: 'We want to show that we care, Save Blood Save Lives! Register yourself, donate your blood, and get a free medical check up!',
      img: '/event/mcare.jpg'
    },
    {
      title: 'M-Run',
      desc: 'Improve your health and build connection in the process, with us and M-Run.',
      img: ['/event/mrun1.jpg', '/event/mrun2.jpeg']
    },
    {
      title: 'Engine Tune Up',
      desc: 'Make sure your vehicle always at its prime, come visit us for free engine tune up service!',
      img: ['/event/etu1.jpg', '/event/etu2.jpg']
    },
    {
      title: 'M-Expo',
      desc: 'Meet some exciting mechanical related companies, projects, machinery, and so many more in this mechanical exhibition.',
      img: '/event/expo.jpeg'
    },
    {
      title: 'Solidarity Forever Summit',
      desc: 'Address important issues, mechanical engineering related, and discuss how we might approach and even solve this problems.',
      img: '/event/solvermit.jpg'
    },
    {
      title: 'M-Talks',
      desc: 'Delve deep into the conversation with professionals and experts to better understand the issues we\'re facing.',
      img: '/event/mtalks.jpg'
    },
    {
      title: 'Ceremony',
      desc: 'End this journey with exhilarating celebration, together with us and our performers!',
      img: '/event/cere.jpg'
    }
  ];
  const left = useTransform(scrollYProgress, [0, 0.5, 1], ['5vw', '70vw', '10vw']);
  const top = useTransform(scrollYProgress, [0, 0.5, 1], ['50vh', '15vh', '0vh']);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], ['0deg', '45deg', '-45deg']);

  scrollYProgress.on('change', (v) => {
    if (v > (height * 3) / 4 / (size?.height ?? 0) && v < 1) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  });

  return (
    <section
      ref={ref}
      id='events'
      className='grid grid-rows-1 relative w-full'
    >
      <div
        className={`sticky top-1/2 z-10 ml-6 md:ml-20 transition-all duration-500 ${
          isExpanded ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <div className='absolute space-y-4 -translate-y-1/2 '>
          {events.map((_, i) => (
            <div
              key={'dsada' + _ + i}
              className='w-[1.5px] h-10 rounded-full bg-stone-500'
            >
              <EventsStep
                range={[i / events.length, (i + 1) / events.length]}
                scrollYProgress={scrollYProgress}
              />
            </div>
          ))}
        </div>
      </div>
      <motion.div
        style={{left, top, rotate}}
        className='sticky w-0 h-0 z-[11] pointer-events-none max-sm:hidden'
      >
        <div className='bg-radial w-96 h-96 from-cyan-200 via-azure-m to-80% to-transparent rounded-full absolute opacity-7.5  translate-12'></div>
        <div className='bg-radial w-72 h-72 from-mauve-m via-purple-m to-80% to-transparent rounded-full absolute opacity-10'></div>
      </motion.div>
      {events.map((event, i) => (
        <EventsCard
          key={'events-card-' + i}
          title={event.title}
          description={event.desc}
          image={event.img}
        />
      ))}
    </section>
  );
}
