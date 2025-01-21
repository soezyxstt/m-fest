import Image from 'next/image';
import { title } from '../ui/text/title';
import { heading } from '../ui/text/headings';
import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { motion } from 'motion/react';
import { HoverCard } from '../ui/hover-card';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useWindowSize } from 'usehooks-ts';

export default function EventsCard({
  title: t,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string | string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.5', 'end 0.5'],
  });

  const isDesktop = useWindowSize().width > 768;
  const is3Words = t.split(' ').length > 2;

  const top = useTransform(scrollYProgress, [0, 0.5, 1], ['75%', '50%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <div
      ref={ref}
      className='h-screen w-full flex flex-col relative pl-12 md:pl-40 pr-10 md:pr-20 overflow-hidden'
    >
      {typeof image === 'string' ? (
        <Image
          src={image}
          alt={'image here'}
          width={1920}
          height={1080}
          className='w-full h-screen absolute z-0 left-0 grayscale-80 object-cover'
        />
      ) : (
        <>
          <Image
            src={image[0]}
            alt={'image here'}
            width={1920}
            height={1080}
            className='w-full h-screen absolute z-0 left-0 grayscale-80 object-cover md:hidden'
          />
          <Image
            src={image[1]}
            alt={'image here'}
            width={1920}
            height={1080}
            className='w-full h-screen absolute z-0 left-0 grayscale-80 object-cover hidden md:block'
          />
        </>
      )}
      <div className='absolute w-full h-full bg-black/60 z-1 left-0'></div>
      <motion.div
        style={{ opacity, top: isDesktop ? top : '50%' }}
        className='z-10 sticky transform -translate-y-1/2 w-fit'
      >
        <HoverCard url={`/events/${t.toLowerCase().replace(' ', '-').replace(' ', '-')}`}>
          <title.h1
            className={`flex gap-6 md:gap-12 ${
              is3Words ? 'md:text-7xl text-5xl' : 'md:text-8xl text-6xl '
            }`}
          >
            {t} <SquareArrowOutUpRight size={32} />
          </title.h1>
          <heading.h4 className=''>{description}</heading.h4>
        </HoverCard>
      </motion.div>
    </div>
  );
}
