import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './modif/accordion';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import {title} from '@/components/ui/text/title'

function Faqs() {
  const faqs = [
    {
      id: '01',
      title: 'What types of innovations are you looking for?',
      content:
        'We seek tech-driven solutions addressing key challenges like urban farming, stunting reduction, tidal flood adaptation, and air pollution reduction. Solutions should be at minimum Technology Readiness Level 6.',
    },
    {
      id: '02',
      title: 'Which regions are eligible to participate?',
      content:
        'Our program is open to innovators from Southeast Asia and Japan who have secured operational funding and are ready to implement solutions at district and city levels.',
    },
    {
      id: '03',
      title: 'How do you support implementation in partner cities?',
      content:
        'We work closely with government partners in Bogor, Semarang, and Palembang to facilitate pilot programs and help scale successful solutions to regional and national levels.',
    },
    {
      id: '04',
      title: 'What industries can participate in the program?',
      content:
        'We welcome solutions from various sectors including Agriculture & Food, Healthcare, Energy & Resources, Environmental & Sustainability, Transportation & Logistics, and SaaS & AI among others.',
    },
    {
      id: '05',
      title: 'What are the key environmental challenges you address?',
      content:
        'Our focus areas include low carbon development, sanitation and wastewater management, food security, rapid urbanization, air pollution, waste management, and climate change adaptation.',
    },
    {
      id: '06',
      title: 'How does the program align with sustainable development goals?',
      content:
        'Our initiative directly supports multiple UN Sustainable Development Goals, including Zero Hunger, Good Health, Clean Water, Sustainable Cities, Climate Action, and Industry Innovation, with a particular focus on environmental impact.',
    },
    {
      id: '07',
      title: 'What kind of funding and support is available?',
      content:
        'While participants need to have secured operational funding, we provide strategic support through government partnerships, implementation guidance, and opportunities to scale solutions from district to national levels.',
    },
  ];

  return (
    <section
      id='faq'
      className='min-h-screen flex max-md:flex-col justify-center md:justify-between md:items-center md:px-20 px-8 py-10 text-white'
    >
      <div className='max-md:text-center mb-16 z-10 isolate flex flex-col max-md:items-center md:max-w-1/3'>
        <title.h1 className='text-xl md:text-3xl font-normal'>
          FAQs
        </title.h1>
        <title.h2 className=''>Do You Have Any Further Questions?</title.h2>
        <Link
          target='_blank'
          href='http://wa.me/628111288114'
          className='flex items-center gap-2 px-8 py-2 rounded-full text-accent-primary font-medium hover:text-white relative group overflow-hidden border h-[calc(100%-1.5rem)] w-fit mt-4 md:mt-8 group transition-all'
        >
          <div className='absolute inset-0 bg-linear-30 from-purple-m to-azure-m w-0 group-hover:w-full transition-all duration-500 ease-in-out' />
          <span className='relative z-10'>Ask Any Question</span>
          <ArrowUpRightIcon className='w-4 h-4 group-hover:text-white z-10 transition-all group-hover:translate-x-1' />
        </Link>
      </div>
      <Accordion
        type='single'
        collapsible
        className='w-full max-w-3xl space-y-4'
      >
        {faqs.map((faq, index) => (
          <FaqItem
            key={index + faq.content}
            {...faq}
            index={index}
          />
        ))}
      </Accordion>
    </section>
  );
}

function FaqItem({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) {
  return (
    <div className='border rounded-lg md:rounded-xl border-accent-primary p-y1 md:py-2 px-4 flex md:gap-6 gap-4 items-center'>
      <div className='text-xl md:text-2xl font-bold text-accent-primary/70'>{`${(
        index + 1
      )
        .toString()
        .padStart(2, '0')}`}</div>
      <AccordionItem
        value={`item-${index}`}
        className='w-full'
      >
        <AccordionTrigger className='font-medium w-full'>
          {title}
        </AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </div>
  );
}

export default Faqs;
