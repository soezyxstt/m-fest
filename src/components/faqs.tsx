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
      title: 'Is the competition open to the public?',
      content:
        'For college students, the Business Case, Innovative Poster and Paper, and Pipeline Design competitions are open. For high school students, the Science, Technology, Engineering, or Mathematics (STEM) competition is open.',
    },
    {
      id: '02',
      title: 'Do participants need to be from the same institution or school?',
      content:
        'Yes, for each competition, participants must be from the same institution or school',
    },
    {
      id: '03',
      title: 'Where will the competition be held?',
      content:
        'The selection phase will be conducted online, while finalists will compete offline at ITB Ganesha.',
    },
    {
      id: '04',
      title: 'How can I become a sponsor?',
      content:
        'You can contact us through the "Ask any question" button.',
    },
    {
      id: '05',
      title: 'Can one person participate in more than one competition?',
      content:
        'One person is only allowed to participate in 1 competition category in M-Fest 2025.',
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
          href='https://mail.google.com/mail/?view=cm&fs=1&to=mfest2025@gmail.com'
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
