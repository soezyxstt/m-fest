"use client";

import { PanelLeft, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type RefObject, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useOnClickOutside } from 'usehooks-ts';
import { Accordion, AccordionContent, AccordionItem } from '@/components/modif/accordion';
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = pathname.split('/')[1].toLocaleLowerCase();
  const [expanded, setExpanded] = useState(false);
  const [val, setval] = useState('');
  const ref = useRef<HTMLElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setval(''));
  const mobileMenuOpen = val === 'root-navbar';

  return (
    <main className='bg-grad md:h-screen text-white'>
      <div className="w-full h-screen bg-stone-400/20 backdrop-blur-sm flex">
        <aside className={`max-sm:hidden ${expanded ? 'w-72' : 'w-16'} h-full transition-all duration-500 overflow-hidden pt-20 p-3 space-y-2 `}>
          <Link href='dashboard' className={`flex w-52 items-center h-12 gap-3 ${expanded && "hover:bg-stone-400/20"} ${expanded && activeTab.toLocaleLowerCase() === "dashboard" && "bg-stone-400/20"} rounded-md transition-all cursor-pointer`}>
            <div className={`p-2 rounded-md transition-all cursor-pointer ${expanded || "hover:bg-stone-400/20"} ${(!expanded && activeTab.toLocaleLowerCase() === "dashboard") && "bg-stone-400/20"}`}>
              <User className={`${expanded ? "h-5 w-5" : "h-6 w-6"} transition-all duration-500`} />
            </div>
            Dashboard
          </Link>
          <Link href='team' className={`flex w-52 items-center h-12 gap-3 ${expanded && "hover:bg-stone-400/20"} ${expanded && activeTab.toLocaleLowerCase() === "team" && "bg-stone-400/20"} rounded-md transition-all cursor-pointer`}>
            <div className={`p-2 rounded-md transition-all cursor-pointer ${expanded || "hover:bg-stone-400/20"} ${(!expanded && activeTab.toLocaleLowerCase() === "team") && "bg-stone-400/20"}`}>
              <Users className={`${expanded ? "h-5 w-5" : "h-6 w-6"} transition-all duration-500`} />
            </div>
            Team
          </Link>
        </aside>
        <div className="w-full">
          <div className="w-full h-16 pointer-events-none"></div>
          <nav ref={ref} className="fixed w-full top-0 left-0 text-white z-50">
            <div className="flex py-4 px-6 items-center justify-between h-16">
              <div className="grid place-items-center aspect-square h-full hover:bg-stone-400/20 rounded-md transition-all cursor-pointer max-sm:hidden" onClick={() => setExpanded(prev => !prev)}>
                <PanelLeft className="h-6 w-6" />
              </div>
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
              <Link href='/' className='flex gap-4 items-center h-full'>
                <Image
                  src='/logo-white.png'
                  width={200}
                  height={200}
                  alt='Mechanical Festival 2025'
                  className='h-8/10 w-auto'
                />
                <Image
                  src='/hmm.png'
                  width={200}
                  height={200}
                  alt='HMM ITB'
                  className='h-full w-auto'
                />
              </Link>
            </div>
            <Accordion
              type='single'
              collapsible
              value={val}
              onValueChange={setval}
            >
              <AccordionItem value='root-navbar'>
                <AccordionContent className='text-white px-8 bg-stone-400/20 backdrop-blur-sm'>
                  <div className='grid grid-cols-1'>
                    <Link
                      className='py-4 border-b'
                      onClick={() => setval('')}
                      href='/dashboard'
                    >
                      Dashboard
                    </Link>
                    <Link
                      href='/team'
                      className='py-4 border-b'
                      onClick={() => setval('')}
                    >
                      Team
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
          <div className="bg-grad w-full md:w-[calc(100%-2rem)] h-[calc(100%-5rem)] m-4 mt-0 ml-0 rounded-xl md:rounded-3xl overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}