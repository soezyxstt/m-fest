import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { prisma } from '@/server/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { registrationColumn, teacherColumn, teamColumn } from './columns';
import WrapperImage from './image';
import { unstable_cache } from 'next/cache';

export default async function Admin() {
  const email = (await auth())?.user?.email ?? "";

  const user = await prisma.profile.findUnique({
    where: {
      email: email,
    },
  })

  const adminCheck = await prisma.profile.findFirst({
    where: {
      email: 'soezyxst@gmail.com'
    }
  })

  if (!user || user.profilePic !== adminCheck?.profilePic) {
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
  })

  const competitionStats = await prisma.competition.findMany({
    select: {
      name: true,
      _count: {
        select: {
          registrations: true
        }
      }
    }
  })

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
    id: row.id,
    phoneNumber: row.team.phoneNumber,
    createdAt: row.createdAt.toLocaleString(),
  }));

  const teams = await unstable_cache(async () => prisma.team.findMany({
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
  }))();

  const accounts = await unstable_cache(async () => prisma.profile.findMany({
    include: {
      team: true
    },
    orderBy: {
      name: 'asc'
    }
  }))()

  const teamTableData = teams.map((row) => ({
    name: row.name,
    institution: row.institution,
    competition: row.registration?.competition?.name,
    leader: row.leader.profile.name,
    members: row.members.length,
  }));

  const totalIncome = reg.reduce((acc, row) => {
    let payment = 0;
    if (row.competition.name === 'BCC') {
      if (row.createdAt <= row.competition.earlyStart) {
        payment = 175000;
      } else {
        payment = 225000;
      }
    } else if (row.competition.name === 'IPPC') {
      if (row.createdAt <= row.competition.earlyStart) {
        payment = 90000;
      } else {
        payment = 110000;
      }
    } else if (row.competition.name === 'PDC') {
      if (row.createdAt <= row.competition.earlyStart) {
        payment = 200000;
      } else {
        payment = 250000;
      }
    } else {
      if (row.createdAt <= row.competition.earlyStart) {
        payment = 120000;
      } else {
        payment = 150000;
      }
    }
    return acc + payment;
  }, 0);

  const teachers = await prisma.teacher.findMany({
    include: {
      team: true
    }
  });

  const teacherTableData = teachers.map(({team, ...row}) => ({
    team: team?.name,
    ...row
  }));

  return (
    <div className="px-8 overflow-x-hidden">
      <Tabs className='min-h-screen w-full text-white' defaultValue='registration'>
        <TabsList className='grid grid-cols-5 w-full'>
          <TabsTrigger value='registration'>Regis</TabsTrigger>
          <TabsTrigger value='team'>Team</TabsTrigger>
          <TabsTrigger value='account'>Team Members</TabsTrigger>
          <TabsTrigger value='teacher'>Teacher</TabsTrigger>
          <TabsTrigger value='recap'>Recap</TabsTrigger>
        </TabsList>
        <TabsContent value='registration'>
          <DataTable data={regTableData} columns={registrationColumn} />
        </TabsContent>
        <TabsContent value='team'>
          <DataTable data={teamTableData} columns={teamColumn} />
        </TabsContent>
        <TabsContent value='account'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Semester/Class</TableHead>
                <TableHead>KTM</TableHead>
                <TableHead>PDDikti</TableHead>
                <TableHead>Twibbon</TableHead>
                <TableHead>Follow IG</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>School Adress</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Major</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.email + account.name}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.team?.name}</TableCell>
                  <TableCell>{account.semester}</TableCell>
                  <TableCell>
                    <WrapperImage
                      src={account.ktm!}
                      key={account.id + "ktm"}
                      width={600}
                      height={300}
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
                  <TableCell>
                    <WrapperImage
                      src={account.followIG!}
                      key={account.id + "igFollow"}
                    ></WrapperImage>
                  </TableCell>
                  <TableCell>{account.gender}</TableCell>
                  <TableCell>{account.origin}</TableCell>
                  <TableCell>{account.phoneNumber}</TableCell>
                  <TableCell>{account.major}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='teacher'>
          <DataTable data={teacherTableData} columns={teacherColumn} />
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

            <Table>
              <TableRow>
                <TableCell>Expected Income</TableCell>
                <TableCell>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalIncome)}</TableCell>
              </TableRow>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}