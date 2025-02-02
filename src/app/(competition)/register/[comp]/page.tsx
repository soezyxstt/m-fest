import { getTeam } from '@/app/_action/team'
import { auth } from '@/auth';
import RegisterPage from './clientPage';
import { prisma } from '@/server/prisma';

export default async function Wrapper() {
  const email = (await auth())?.user?.email ?? "";
  const team = await getTeam(email);
  const competitions = await prisma.competition.findMany();
  return (
    <RegisterPage team={team} competitions={competitions} />
  )
}