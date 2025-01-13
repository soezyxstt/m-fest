import {title} from '@/components/ui/text/title';
import TimelineClient from './timeline';

const timelineData = [
  {
    date: 'February 2025',
    title: 'Pre-Program',
    content: 'M-Care: Klinik Mesin',
  },
  {
    date: 'February 2025',
    title: 'Pre-Program',
    content: 'M-Care: Hari Bermain Bersama (HMB)',
  },
  {
    date: 'February - April 2025',
    title: 'Starting Phase',
    content: 'Competitions Registration and Submission',
  },
  {
    date: '13 April 2025',
    title: 'Acceleration Phase',
    content: 'M-Run and Engine Tune-Up',
  },
  {
    date: '2 May 2025',
    title: 'Final Phase',
    content: 'Competitions Final, M-Expo, and Solidarity Forever Summit',
  },
  {
    date: '3 May 2025',
    title: 'Ending Phase',
    content: 'M-Talks, M-Expo, Solidarity Forever Summit, and Ceremony',
  },
];

const timelineData2 = timelineData.map((item) => ({
  ...item,
  description: item.content,
}));

const Timeline = () => {
  return (
    <section
      id='timeline'
      className='min-h-screen w-full overflow-hidden relative py-20 text-white'
    >
      <div className='text-center mb-16 z-10 isolate'>
        <title.h1 className='mb-4'>Programs Timeline</title.h1>
      </div>
      <TimelineClient data={timelineData2} />
    </section>
  );
};

export default Timeline;
