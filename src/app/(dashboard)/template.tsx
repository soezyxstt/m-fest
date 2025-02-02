"use client";

import { Home, PanelLeft, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = pathname.split('/')[1].toLocaleLowerCase();
  // const [expanded, setExpanded] = useState(true);
  const params = useSearchParams();
  const expanded = ((params.get('collapsed') ?? "") !== 'true');

  return (
    <main className='bg-grad md:h-screen text-white'>
      <div className="w-full md:h-screen bg-stone-400/20 backdrop-blur-sm flex">
        <aside
          className={`max-sm:hidden ${expanded ? 'w-72' : 'w-16'} h-full space-y-2 transition-all duration-500 overflow-hidden pt-20 p-3`}>
          <Link href='dashboard'
            className={`flex w-52 items-center h-12 gap-3 ${expanded && "hover:bg-stone-400/20"} ${expanded && activeTab.toLocaleLowerCase() === "dashboard" && "bg-stone-400/20"} rounded-md transition-all cursor-pointer`}>
            <div
              className={`p-2 rounded-md transition-all cursor-pointer ${expanded || "hover:bg-stone-400/20"} ${(!expanded && activeTab.toLocaleLowerCase() === "dashboard") && "bg-stone-400/20"}`}>
              <Home className={`${expanded ? "h-5 w-5" : "h-6 w-6"} transition-all duration-500`} />
            </div>
            Dashboard
          </Link>
          <Link href='team'
            className={`flex w-52 items-center h-12 gap-3 ${expanded && "hover:bg-stone-400/20"} ${expanded && activeTab.toLocaleLowerCase() === "team" && "bg-stone-400/20"} rounded-md transition-all cursor-pointer`}>
            <div
              className={`p-2 rounded-md transition-all cursor-pointer ${expanded || "hover:bg-stone-400/20"} ${(!expanded && activeTab.toLocaleLowerCase() === "team") && "bg-stone-400/20"}`}>
              <Users className={`${expanded ? "h-5 w-5" : "h-6 w-6"} transition-all duration-500`} />
            </div>
            Team
          </Link>
        </aside>
        <div className="w-full">
          <nav className="h-16 w-full flex py-4 px-6 items-center justify-between text-white">
            <Link
              href={!expanded ? '?' : '?collapsed=true'}
              className="grid place-items-center aspect-square h-full hover:bg-stone-400/20 rounded-md transition-all cursor-pointer max-sm:hidden">
              <PanelLeft className="h-6 w-6" />
            </Link>
            <Link
              href={!expanded ? '?' : '?collapsed=true'}
              className='md:hidden w-8 h-8 flex flex-col justify-center items-center z-[60]'
            >
              <motion.span
                className='w-8 h-0.5 bg-linear-90 from-purple-m to-azure-m block absolute'
                animate={{
                  rotate: expanded ? 45 : 0,
                  y: expanded ? 0 : -8,
                  width: expanded ? 24 : 24,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className='w-6 h-0.5 bg-linear-90 from-mauve-m to-teal-m block absolute'
                animate={{
                  opacity: expanded ? 0 : 1,
                  x: expanded ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className='w-4 h-0.5 bg-linear-90 from-azure-m to-teal-m block absolute'
                animate={{
                  rotate: expanded ? -45 : 0,
                  y: expanded ? 0 : 8,
                  width: expanded ? 24 : 16,
                }}
                transition={{ duration: 0.3 }}
              />
            </Link>
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
          </nav>
          <div
            className="bg-grad w-[calc(100%-2rem)] h-[calc(100%-5rem)] m-4 mt-0 ml-0 rounded-xl max-sm:rounded-b-none md:rounded-3xl no-scrollbar overflow-y-auto p-6 ">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}