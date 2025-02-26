import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { prisma } from '@/server/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { registrationColumn, teamColumn } from './columns';
import WrapperImage from './image';

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

  const reg = await prisma.registration.findMany({
    include: {
      team: true,
      competition: true,
    },
    orderBy: {
      competition: {
        name: 'asc'
      }
    }
  });

  const competitionStats = await prisma.competition.findMany({
    select: {
      name: true,
      _count: {
        select: {
          registrations: true
        }
      }
    }
  });

  const stats = {
    totalTeams: await prisma.team.count(),
    totalRegistrations: await prisma.registration.count(),
    verifiedRegistrations: await prisma.registration.count({
      where: { isVerified: true }
    }),
    totalAccounts: await prisma.profile.count()
  };

  const regTableData = reg.map((row) => ({
    team: row.team?.name,
    competition: row.competition?.name,
    payment: row.paymentProofUrl,
    isVerified: row.isVerified,
    createdAt: row.createdAt.toLocaleDateString(),
    id: row.id,
  }));

  const teams = await prisma.team.findMany({
    include: {
      registration: {
        include: {
          competition: true
        }
      },
      leader: {
        include: {
          profile: true
        }
      },
      members: true
    },
    orderBy: {
      name: 'asc'
    }
  });
  const accounts = await prisma.profile.findMany({
    include: {
      team: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  const teamTableData = teams.map((row) => ({
    name: row.name,
    institution: row.institution,
    competition: row.registration?.competition?.name,
    leader: row.leader.profile.name,
    members: row.members.length,
  }));
  
  return (
    <div className="px-8 overflow-x-hidden">
      <Tabs className='min-h-screen w-full text-white' defaultValue='registration'>
        <TabsList className='grid grid-cols-4 w-full'>
          <TabsTrigger value='registration'>Regis</TabsTrigger>
          <TabsTrigger value='team'>Team</TabsTrigger>
          <TabsTrigger value='Account'>Account</TabsTrigger>
          <TabsTrigger value='recap'>Recap</TabsTrigger>
        </TabsList>
        <TabsContent value='registration'>
          <DataTable data={regTableData} columns={registrationColumn} />
        </TabsContent>
        <TabsContent value='team'>
          <DataTable data={teamTableData} columns={teamColumn} />
        </TabsContent>
        <TabsContent value='Account'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>KTM</TableHead>
                <TableHead>PDDikti</TableHead>
                <TableHead>Twibbon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.email}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.team?.name}</TableCell>
                  <TableCell>
                    <WrapperImage
                      src={account.ktm!}
                      key={account.id + "ktm"}
                    />
                  </TableCell>
                  <TableCell>
                    <WrapperImage
                      src={account.pdDikti!}
                      key={account.id + "profile"}
                    />
                  </TableCell>
                  <TableCell>
                    <WrapperImage
                      src={account.twibbon!}
                      key={account.id + "twibbon"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='recap'>
          <div className="space-y-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total Teams</TableCell>
                  <TableCell>{stats.totalTeams}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Registrations</TableCell>
                  <TableCell>{stats.totalRegistrations}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Verified Registrations</TableCell>
                  <TableCell>{stats.verifiedRegistrations}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Accounts</TableCell>
                  <TableCell>{stats.totalAccounts}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competition</TableHead>
                  <TableHead>Registrations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitionStats.map((comp) => (
                  <TableRow key={comp.name}>
                    <TableCell>{comp.name}</TableCell>
                    <TableCell>{comp._count.registrations}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}