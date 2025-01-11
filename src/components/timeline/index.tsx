import {title} from '@/components/ui/text/title';
import TimelineClient from './timeline';

const timelineData = [
  {
    date: '20 Dec 2024',
    title: 'Pre-Program',
    content: 'Soft Launch',
  },
  {
    date: '21 Dec 2024 - 20 Jan 2025',
    title: 'Pre-Program',
    content: 'Launch, Socialization',
  },
  {
    date: '21 Jan - 11 Feb 2025',
    title: 'Pre-Program',
    content: 'Close Registration & Applicants Selection',
  },
  {
    date: '11 - 14 Feb 2025',
    title: 'Pre-Program',
    content: 'Top 25 Announcement',
  },
  {
    date: '17 Feb - 17 Mar 2025',
    title: 'Acceleration Phase',
    content: 'Boot Camp & Business Matchmaking',
  },
  {
    date: '21 Mar - 11 April 2024',
    title: 'Demo Day',
    content: 'Top 6',
  },
  {
    date: 'April - Jun 2024',
    title: 'Pilot Implementation',
    content: 'Pilot Project (On-site)',
  },
  {
    date: 'Jun 2024',
    title: 'Post-program',
    content: 'Pilot Publication',
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
