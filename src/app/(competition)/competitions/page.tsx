import GradientButton from '@/components/ui/button/bg-gradient';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import Image from 'next/image';
import { montserrat, roboto } from '@/style/font';
import Link from 'next/link';
import { Instagram, Mail, Twitter } from 'lucide-react';
import GradientText from '@/components/ui/text/gradient';
import { competitions } from '@/lib/competition';

export default function CompetitionsPage() {
  return (
    <Accordion
      type='single'
      orientation='vertical'
      className='w-full h-screen flex flex-col md:flex-row overflow-hidden'
      defaultValue='item-0'
    >
      <AccordionItem
        value={`item-nav`}
        className='flex max-sm:flex-col md:data-[state=open]:w-[60vw] md:h-full max-sm:data-[state=open]:h-[60vh] md:data-[state=closed]:w-[10vw] max-sm:data-[state=closed]:h-[10vh] max-sm:w-full duration-750 transition-all'
      >
        <AccordionHeader className='flex max-sm:w-full md:h-full md:data-[state=closed]:w-[10vw] max-sm:data-[state=closed]:h-[10vh] max-sm:data-[state=open]:h-[0vh] md:data-[state=open]:w-[0vw] transition-all duration-250 overflow-hidden'>
          <AccordionTrigger className='border border-x-0 border-white md:h-screen text-white w-full font-medium transition-all cursor-pointer md:[writing-mode:vertical-rl] md:[text-orientation:mixed] flex items-center justify-between max-sm:px-10 md:px-20 uppercase text-2xl md:text-4xl'>
            Navigation
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className='text-white overflow-hidden max-sm:w-full md:data-[state=closed]:w-0 md:data-[state=open]:w-[60vw] max-sm:data-[state=closed]:h-0 max-sm:data-[state=open]:h-[60vh] transition-all duration-750 ease-in-out relative flex flex-col items-center justify-center gap-10'>
          <div className='flex gap-4 md:gap-6 h-12 md:h-16 items-center mb-4 md:mb-12'>
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
          <Link
            href='/'
            className={`${montserrat.className} text-5xl font-medium uppercase`}
          >
            Home
          </Link>
          <Link
            href='/#timeline'
            className={`${montserrat.className} text-5xl font-medium uppercase`}
          >
            Timeline
          </Link>
          <Link
            href='/#events'
            className={`${montserrat.className} text-5xl font-medium uppercase`}
          >
            Events
          </Link>
          <div className='flex gap-10 items-center md:mt-12 mt-4'>
            <Link
              className=''
              href='https://www.instagram.com/mfestitb/'
            >
              <Instagram size={24} />
            </Link>
            <Link
              className=''
              href='https://www.instagram.com/mfestitb/'
            >
              <Twitter size={24} />
            </Link>
            <Link
              className=''
              href='https://www.instagram.com/mfestitb/'
            >
              <Mail size={24} />
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      {competitions.map((competition, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className='flex max-sm:flex-col md:data-[state=open]:w-[60vw] md:h-full max-sm:data-[state=open]:h-[60vh] md:data-[state=closed]:w-[10vw] max-sm:data-[state=closed]:h-[10vh] max-sm:w-full duration-750 transition-all'
        >
          <AccordionHeader className='flex max-sm:w-full md:h-full md:data-[state=closed]:w-[10vw] max-sm:data-[state=closed]:h-[10vh] max-sm:data-[state=open]:h-[0vh] md:data-[state=open]:w-[0vw] transition-all duration-250 overflow-hidden'>
            <AccordionTrigger className='border border-x-0 border-white md:h-screen text-white w-full font-medium transition-all cursor-pointer md:[writing-mode:vertical-rl] md:[text-orientation:mixed] flex items-center justify-between max-sm:px-10 md:px-20 uppercase text-2xl md:text-4xl duration-750'>
              <div>{competition.abbreviation}</div>
              <div className='text-base font-normal'>
                <GradientText
                  style={{ animationDelay: `${0.25 * i}s` }}
                  className='md:text-base text-base font-normal'
                >
                  {competition.isOpen ? 'Register Now!' : 'Coming Soon'}
                </GradientText>
              </div>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className='text-white relative overflow-hidden max-sm:w-screen md:data-[state=closed]:w-0 md:data-[state=open]:w-[60vw] max-sm:data-[state=closed]:h-0 max-sm:data-[state=open]:h-[60vh] transition-all duration-750 ease-in-out'>
            <div className='h-3/5 md:w-[60vw] w-screen flex flex-col items-center py-12 md:px-12 bg-cover bg-center relative'>
              <div className='flex flex-col justify-between items-center h-full md:px-16 px-6 max-sm:w-screen max-sm:space-y-6'>
                <Image
                  src={competition.logo}
                  width={200}
                  height={200}
                  alt={competition.abbreviation}
                  className='md:h-10 h-8 w-auto'
                />
                <p
                  className={`text-center text-2xl md:text-5xl uppercase font-semibold ${roboto.className}`}
                >
                  <span>
                    {competition.title.substring(
                      0,
                      competition.title.lastIndexOf(' ')
                    )}
                  </span>
                  <span className='italic font-light text-2xl md:text-5xl'>
                    {competition.title.substring(
                      competition.title.lastIndexOf(' '),
                      competition.title.length
                    )}
                  </span>
                </p>
                <div className='flex *:*:w-full justify-between w-full gap-4 text-center max-sm:text-sm'>
                  <div className=''>
                    <p className='text-muted text-sm max-sm:text-xs'>
                      Registration Batch 1:
                    </p>
                    <p className=''>{competition.reg1}</p>
                  </div>
                  <div className=''>
                    <p className='text-muted text-sm max-sm:text-xs'>
                      Registration Batch 2:
                    </p>
                    <p className=''>{competition.reg2}</p>
                  </div>
                </div>
                <div className='*:w-full gap-4 text-center'>
                  <p className='text-muted text-sm'>Total Prize Pool:</p>
                  <p>
                    IDR{' '}
                    {competition.prize.toLocaleString('id-ID', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className='absolute bottom-0 w-full translate-y-full pointer-events-none bg-gradient-to-b from-black/90 to-transparent h-1/5 z-10 grid place-items-center'></div>
            </div>
            <div className='relative h-2/5 w-full md:w-[60vw]'>
              <Image
                src={competition.cover}
                alt=''
                width={600}
                height={400}
                className='w-full object-center object-cover brightness-30 z-0 relative'
              />
              <div className='absolute top-0 w-full h-full z-10 flex flex-col items-center gap-6 md:gap-12 py-6 md:py-12'>
                <div className='flex gap-12 font-medium relative z-20'>
                  <GradientButton variant='outline'>Guide Book</GradientButton>
                  <GradientButton disabled={!competition.isOpen} variant='glow'>Register</GradientButton>
                </div>
                <p className='text-center w-8/10 max-sm:text-xs text-sm'>
                  {competition.desc}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
