import { getCachedTeam, getCachedTeams } from "@/app/_action/team";
import { CreateTeamForm, JoinTeamForm } from "@/app/(dashboard)/team/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { auth } from "@/auth";
import GradientText from "@/components/ui/text/gradient";
import Link from "next/link";

export default async function TeamPage() {
  const email = (await auth())?.user?.email ?? "";

  // const team = await getTeam();
  const team = await getCachedTeam(email);
  const teams = await getCachedTeams();

  const wagLinks = {
    BCC: "https://chat.whatsapp.com/GF8DRvwKDmfCUz1hlePySi",
    PDC: "https://chat.whatsapp.com/EhCa1P216bFGQoOagocyOX",
    IPPC: "https://chat.whatsapp.com/GBf3XtAQh086XaFP0vSdkq",
    STEM: "#"
  }

  return (
    <div
      className="@container flex flex-col gap-6 md:gap-10 h-full w-full bg-stone-400/10 rounded-lg md:rounded-2xl p-4">
      {!team ? (
        <>
          <div className="flex max-sm:flex-col justify-between w-full h-min gap-4">
            <CreateTeamForm />
            <JoinTeamForm />
          </div>
          <div className="flex-1">
            <GradientText className='text-left text-lg mb-2 md:mb-4 md:text-2xl'>Team List</GradientText>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Team Member</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.institution}</TableCell>
                    <TableCell>{team.leader?.profile?.name}</TableCell>
                    <TableCell>{team.members.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <>
          <div className="flex max-sm:flex-col items-center gap-2 justify-between">
            {team.registration ? (team.registration.isVerified ? (
              <p className="">
                Verification Process
              </p>
            ) : (
              <div className="">
                {team.registration.competition.name} Competition
              </div>
            )) : (
              <div className="text-muted flex gap-2 items-center">
                No Competition
                <Link href='/competitions' className="text-azure-m underline">
                  Register Now
                </Link>
              </div>
            )}
            <div className="flex border-b border-white gap-4 px-4 md:px-6 py-2 items-center min-w-64 w-fit">
              <div className="text-muted">
                Team Code:
              </div>
              <div className="text-xl md:text-3xl">
                {team.secretCode}
              </div>
            </div>
          </div>
          {team.registration?.competition.name && (
            <Link className='my-4' href={wagLinks[team.registration.competition.name]}>Please join WAG for verification process and further infos.</Link>
          )}
          <div className="">
            <GradientText className='text-left text-lg mb-2 md:mb-4 md:text-2xl'>Team Information</GradientText>
            <Table>
              <TableBody className="*:border-none *:even:bg-stone-400/20">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{team.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Institution</TableCell>
                  <TableCell>{team.institution}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Leader</TableCell>
                  <TableCell>{team.leader?.profile?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>{team.phoneNumber}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <GradientText className='text-left text-lg my-2 md:my-4 md:text-2xl'>Team Members</GradientText>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Semester</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.semester}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}