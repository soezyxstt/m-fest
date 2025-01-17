'use client';

import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { HTMLAttributes } from 'react';

interface TimelineCardProps {
  title: string;
  date: string;
  description: string;
  index: number;
}

interface TimelineCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
  description: string;
  index: number;
  isDesktop: boolean;
}

function TimelineCard({
  title,
  description,
  date,
  index,
  className,
  isDesktop,
}: TimelineCardProps) {
  const isOdd = index % 2 === 0;
  const transition = { duration: 0.5, ease: 'easeInOut', delay: 0.15 };
  return (
    <div
      className={cn(
        'relative flex items-center',
        isOdd ? 'md:flex-row-reverse md:-translate-x-full' : 'md:flex-row'
      )}
    >
      <div
        className={cn(
          'absolute grid place-items-center  rounded-full w-10 h-10 md:w-20 md:h-20',
          isOdd
            ? 'md:translate-x-[175%] -translate-x-[175%]'
            : '-translate-x-[175%]'
        )}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='font-semibold [font-family:var(--font-next-parisienne)] text-2xl md:text-4xl text-accent-primary font-stretch-extra-condensed max-sm:hidden'
        >
          {`${index + 1}`.padStart(2, '0')}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={cn(
          'relative grid place-items-center backdrop-blur-3xl rounded-full',
          isOdd ? 'md:translate-x-1/2 -translate-x-1/2' : '-translate-x-1/2'
        )}
      >
        <Sparkles
          className='w-6 h-6 md:w-10 md:h-10'
          strokeWidth={1.5}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={transition}
        className={cn(
          'flex flex-col justify-center border-accent-primary/75 p-4 md:p-6 rounded-sm h-32 w-72 max-sm:max-w-[calc(100vw-4rem)] md:h-42.5 md:w-100 md:mx-4',
          className
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: isDesktop ? (isOdd ? 30 : -30) : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={transition}
          className={cn(
            'flex text-muted text-sm font-medium mb-2',
            isOdd ? 'md:justify-end' : 'md:justify-start'
          )}
        >
          <h3 className=''>{title}</h3>
          <span className='mx-2'>:</span>
          <p className=''>{date}</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: isDesktop ? (isOdd ? 30 : -30) : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={transition}
          className={cn(
            'md:text-3xl w-full text-xl font-[Arial] font-bold font-stretch-extra-condensed text-wrap',
            isOdd ? 'md:text-right' : 'md:text-left'
          )}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default TimelineCard;
