import Image from 'next/image';
import { title } from '../ui/text/title';
import { heading } from '../ui/text/headings';
import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { motion } from 'motion/react';
import { HoverCard } from '../ui/hover-card';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function EventsCard({
  title: t,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.5', 'end 0.5'],
  });

  const top = useTransform(scrollYProgress, [0, 0.5, 1], ['75%', '50%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <div
      ref={ref}
      className='h-screen w-full flex flex-col relative pl-12 md:pl-40 '
    >
      <Image
        src={image}
        alt={'image here'}
        width={1920}
        height={1080}
        className='w-full h-full absolute z-0 left-0 grayscale-100'
      />
      <div className='absolute w-full h-full bg-black/60 z-1 left-0'></div>
      <motion.div
        style={{ opacity, top }}
        className='z-10 sticky transform -translate-y-1/2 w-fit'
      >
        <HoverCard url=''>
          <heading.h3 className=''>{description}</heading.h3>
          <title.h1 className=' md:text-8xl text-6xl flex gap-6 md:gap-12'>{t} <SquareArrowOutUpRight size={32} /></title.h1>
        </HoverCard>
      </motion.div>
    </div>
  );
}
