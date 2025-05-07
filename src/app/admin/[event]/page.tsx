import { prisma } from '@/server/prisma';
import { EventName } from '@prisma/client';
// import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import { eventColumn } from '../columns';
import DataTableExcel from './data-table-excel';
import { cache } from 'react';

const getRegistrations = cache(
  async (eventName: EventName) => await prisma.eventRegistration.findMany({
    where: {
      eventName,
    },
    orderBy: {
      name: 'asc',
    },
  })
)

export default async function EventAdminPage({
  params,
}: Readonly<{
  params: Promise<{ event: string }>;
}>) {
  const { event } = await params;
  const registrations = await getRegistrations(event.replace(/-/g, '_').toUpperCase() as EventName);
  if (!['m-talks', 'm-expo'].includes(event.toLowerCase())) {
    redirect('/404')
  }

  return (
    <main className='min-h-screen pt-2 md:pt-8 p-8 md:p-16 text-white bg-fixed'>
      <DataTableExcel datas={registrations} data={registrations} columns={eventColumn} title={event + '-registrant'} />
    </main>
  )
}