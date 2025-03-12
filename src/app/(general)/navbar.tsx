'use client';

import Image from 'next/image';
import { type RefObject, useRef, useState } from 'react';
import { useScroll } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import GradientButton from '@/components/ui/button/bg-gradient';
import { motion } from 'motion/react';
import { useOnClickOutside } from 'usehooks-ts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/modif/accordion';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [expanded, setExpanded] = useState(true);
  const [val, setval] = useState('');
  const ref = useRef<HTMLElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setval(''));
  const mobileMenuOpen = val === 'root-navbar';
  const { scrollY } = useScroll();
  let timeOut = setTimeout(() => { }, 1000);

  scrollY.on('change', (v) => {
    if (v > 300) {
      setExpanded(false);
    } else {
      clearTimeout(timeOut);
      setExpanded(true);
    }
  });

  return (
    <>
      {/* Mobile Nav */}
      <nav
        className='z-50 fixed top-0 w-full md:hidden backdrop-blur-md '
        ref={ref}
      >
        <div className='flex items-center px-8 py-6 h-24 w-full justify-between'>
          <Link href='/' className='flex gap-4 items-center h-full'>
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
          </Link>
          <button
            className='md:hidden w-8 h-8 flex flex-col justify-center items-center z-[60]'
            onClick={() => setval(val === 'root-navbar' ? '' : 'root-navbar')}
          >
            <motion.span
              className='w-8 h-0.5 bg-linear-90 from-purple-m to-azure-m block absolute'
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 0 : -8,
                width: mobileMenuOpen ? 24 : 24,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className='w-6 h-0.5 bg-linear-90 from-mauve-m to-teal-m block absolute'
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
                x: mobileMenuOpen ? 20 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className='w-4 h-0.5 bg-linear-90 from-azure-m to-teal-m block absolute'
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? 0 : 8,
                width: mobileMenuOpen ? 24 : 16,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
        <Accordion
          type='single'
          collapsible
          value={val}
          onValueChange={setval}
        >
          <AccordionItem value='root-navbar'>
            <AccordionContent className='text-white px-8'>
              <div className='grid grid-cols-1'>
                <Link
                  className='py-4 border-b'
                  onClick={() => setval('')}
                  href='/sign-in'
                >Sign In</Link>
                <Link
                  className='py-4 border-b'
                  onClick={() => setval('')}
                  href='/#timeline'
                >
                  Timeline
                </Link>
                <Link
                  href='/#events'
                  className='py-4 border-b'
                  onClick={() => setval('')}
                >
                  Events
                </Link>
                <Link
                  className='py-4 border-b'
                  onClick={() => setval('')}
                  href='/competitions'
                >
                  Competitions
                </Link>
                <Accordion
                  type='single'
                  collapsible
                >
                  <AccordionItem
                    value='register'
                    className='border-b'
                  >
                    <AccordionTrigger className=''>Register</AccordionTrigger>
                    <AccordionContent>
                      <Command>
                        <CommandList className='max-h-screen'>
                          <CommandGroup
                            className=''
                            heading='Competitions'
                          >
                            <CommandItem asChild>
                              <Link href='/register/bcc' className='text-muted'>
                                BCC
                              </Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/ippc' className='text-muted'>IPPC</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/pdc' className='text-muted'>PDC</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/stem' className='text-muted'>STEM</Link>
                            </CommandItem>
                          </CommandGroup>
                          <CommandGroup heading='Events'>
                            <CommandItem asChild>
                              <Link href='/register/m-care' className='text-muted'>M-Care</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='https://bit.ly/RegistrasiMRUN2025' target='_blank' className='text-muted'>M-Run</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/engine-tune-up' className='text-muted'>Engine Tune Up</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/m-expo' className='text-muted'>M-Expo</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/solidarity-forever-summit' className='text-muted'>
                                Solidarity Forever Summit
                              </Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/m-talks' className='text-muted'>M-Talks</Link>
                            </CommandItem>
                            <CommandItem asChild>
                              <Link href='/register/ceremony' className='text-muted'>Ceremony</Link>
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>

      {/* Desktop Nav */}
      <div
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-transform duration-500 justify-between backdrop-blur-sm max-sm:hidden',
          expanded ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <nav
          className='w-full h-20 md:h-24 flex gap-4 md:gap-8 p-4 md:py-6 md:px-10 items-center z-50 transition-transform duration-500 justify-between max-sm:hidden'
          onMouseEnter={() => {
            clearTimeout(timeOut);
            setExpanded(true);
          }}
        >
          <Link href='/' className='flex gap-6 h-full items-center'>
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
          </Link>
          <div className='flex items-center gap-6 text-white font-semibold'>
            <Link
              className='px-4 h-full'
              href='/#timeline'
            >
              Timeline
            </Link>
            <Link
              href='/#events'
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
            <div className="flex gap-4 items-center">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GradientButton
                    variant='outline'
                    className='px-4 h-full min-w-28'
                  >
                    Register
                  </GradientButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='text-white backdrop-blur-md'>
                  <DropdownMenuLabel className='text-white'>Competitions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/bcc' className='text-muted'>
                      BCC
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/ippc' className='text-muted'>IPPC</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/pdc' className='text-muted'>Pipeline</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/stem' className='text-muted'>STEM</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-white'>Events</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/m-care' className='text-muted'>M-Care</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='https://bit.ly/RegistrasiMRUN2025' target='_blank' className='text-muted'>M-Run</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/engine-tune-up' className='text-muted'>Engine Tune Up</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/m-expo' className='text-muted'>M-Expo</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/solidarity-forever-summit' className='text-muted'>Solidarity Forever Summit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/m-talks' className='text-muted'>M-Talks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/register/ceremony' className='text-muted'>Ceremony</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href='/sign-in'>
                <GradientButton
                  variant='glow'
                  className='px-4 h-full min-w-24'
                >
                  Sign In
                </GradientButton>
              </Link>
            </div>
          </div>
        </nav>
        <div
          className='h-16 w-full absolute bottom-0 translate-y-full left-0 max-sm:hidden'
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => {
            clearTimeout(timeOut);
            if (scrollY.get() > 300)
              timeOut = setTimeout(() => setExpanded(false), 1000);
          }}
        ></div>
      </div>
    </>
  );
}
