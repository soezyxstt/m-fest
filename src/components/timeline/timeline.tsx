'use client';

import { useMediaQuery } from 'usehooks-ts';
import { TimelineBranch } from './timeline-branch';
import TimelineCard from './timeline-card';

function TimelineClient({ data }: { data: { date: string, title: string, description: string }[] }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');  
  return (
    <TimelineBranch>
      {data.map((item, index) => (
        <TimelineCard key={index + item.title + 'timeline-card'} index={index} title={item.title} date={item.date} description={item.description} isDesktop={isDesktop} />
      ))}
    </TimelineBranch>
  )
}

export default TimelineClient;
