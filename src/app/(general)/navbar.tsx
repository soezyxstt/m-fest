'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useScroll } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import GradientButton from '@/components/ui/button/bg-gradient';

export default function Navbar() {
  const [expanded, setExpanded] = useState(true);
  const { scrollY } = useScroll();

  let timeOut = setTimeout(() => {}, 1000);

  scrollY.on('change', (v) => {
    if (v > 300) {
      setExpanded(false);
    } else {
      clearTimeout(timeOut);
      setExpanded(true);
    }
  });

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-transform duration-500 justify-between backdrop-blur-sm',
        expanded ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <nav
        className='w-full h-20 md:h-24 flex gap-4 md:gap-8 p-4 md:py-6 md:px-10 items-center z-50 transition-transform duration-500 justify-between'
        onMouseEnter={() => {
          clearTimeout(timeOut);
          setExpanded(true);
        }}
      >
        <div className='flex gap-6 h-full items-center'>
          <Image
            src='/logo-white.png'
            width={200}
            height={200}
            alt='Mechanical Festival 2025'
            className='h-7/10 w-auto'
          />
          <Image
            src='/hmm.png'
            width={200}
            height={200}
            alt='HMM ITB'
            className='h-full w-auto'
          />
        </div>
        <div className='flex items-center gap-6 text-white font-semibold'>
          <Link
            className='px-4 h-full'
            href='#timeline'
          >
            Timeline
          </Link>
          <Link
            href='#events'
            className='px-4 h-full'
          >
            Events
          </Link>
          <Link
            className='px-4 h-full'
            href='/competitions'
          >
            Competitions
          </Link>
          <Link href='/register'>
            <GradientButton
              variant='outline'
              className='px-4 h-full'
            >
              Register
            </GradientButton>
          </Link>
        </div>
      </nav>
      <div
        className='h-16 w-full absolute bottom-0 translate-y-full left-0'
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          clearTimeout(timeOut);
          if (scrollY.get() > 300)
            timeOut = setTimeout(() => setExpanded(false), 1000);
        }}
      ></div>
    </div>
  );
}
