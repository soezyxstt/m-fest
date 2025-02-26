import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { prisma } from '@/server/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { registrationColumn } from './columns';
export default async function Admin() {
  const email = (await auth())?.user?.email ?? "";
  const user = await prisma.profile.findUnique({
    where: {
      email: email,
    },
  });

  if (user?.profilePic !== (await prisma.profile.findFirst({ where: { email: 'soezyxst@gmail.com' } }))?.profilePic) {
    redirect('/');
  }

  const reg = (await prisma.registration.findMany({
    include: {
      team: true,
      competition: true,
    },
  })).map((team) => ({
    team: team.team?.name,
    competition: team.competition.name,
    payment: team.paymentProofUrl,
    isVerified: team.isVerified,
    createdAt: team.createdAt.toDateString(),
  }));

  const teams = (await prisma.team.findMany())
  const accounts = await prisma.profile.findMany();
  return (
    <div className="px-8 overflow-x-hidden">
      <Tabs className='min-h-screen w-full text-white' defaultValue='registration'>
        <TabsList className='grid grid-cols-3 w-full'>
          <TabsTrigger value='registration'>Regis</TabsTrigger>
          <TabsTrigger value='team'>Team</TabsTrigger>
          <TabsTrigger value='Account'>Account</TabsTrigger>
        </TabsList>
        <TabsContent value='registration'>
          <DataTable columns={registrationColumn} data={reg} />
        </TabsContent>
        <TabsContent value='team'>
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(teams[0]).map((key, i) => (
                  <TableHead key={key + i + "team"}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((row) => (
                <TableRow key={row.id + "dadad"}>
                  {Object.values(row).map((value, i) => {
                    const val = typeof value === 'object' ? value.toDateString() : value.toString();
                    return <TableCell key={val + i + row.id}>{val}</TableCell>
                  }
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='Account'>
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(accounts[0]).map((key, i) => (
                  <TableHead key={key + i + "acccc"}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((row) => (
                <TableRow key={row.id}>
                  {Object.values(row).map((value, i) => {
                    const val = typeof value === 'object' ? value?.toDateString() : value.toString();
                    return <TableCell key={val! + i + 5 + row.id}>{val}</TableCell>
                  }
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}