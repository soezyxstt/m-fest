"use server";

import {authActionClient} from '@/lib/safe-action';
import {createTeamSchema, joinTeamSchema} from '@/lib/schema';
import {prisma} from '@/server/prisma';
import {unstable_cache, revalidatePath} from "next/cache";
import {generateRandomCode} from "@/lib/utils";

const date = (new Date()).toLocaleString().replace(/[\/\s:]/g, '-');

export async function getTeams() {
  return prisma.team.findMany({
    include: {
      leader: {
        include: {
          profile: true
        }
      },
      members: true
    },
  })
}

export async function getTeam(email: string) {
  const user = await prisma.profile.findUnique({
    where: {
      email
    },
    include: {
      team: {
        include: {
          leader: {
            include: {
              profile: true
            }
          },
          members: true,
          registration: {
            include: {
              competition: true
            }
          }
        }
      },
    },
  })

  return user?.team
}

export const getCachedTeam = unstable_cache(async (email: string) => {
    return getTeam(email)
  },
  ["get_team-" + date], {tags: ["get_team"], revalidate: 6});

export const getCachedTeams = unstable_cache(async () => {
    return getTeams()
  }, ["get_teams-" + date], {tags: ["get_teams"], revalidate: 60 * 10}
);

export const createTeam = authActionClient
  .metadata({actionName: "createTeam"})
  .schema(createTeamSchema)
  .action(async ({ctx: {id}, parsedInput: {institution, name, phoneNumber}}) => {
    try {
      const leader = await prisma.leader.create({
        data: {
          profileId: id,
        }
      })

      const team = await prisma.team.create({
        data: {
          name,
          institution,
          phoneNumber,
          secretCode: generateRandomCode(),
          members: {
            connect: {id}
          },
          leader: {
            connect: {id: leader.id}
          }
        },
      });

      if (!team) {
        throw new Error('Failed to create team');
      }
      revalidatePath("/team")
      return team;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to update or create profile')
    }
  })

export const joinTeam = authActionClient
  .metadata({actionName: "joinTeam"})
  .schema(joinTeamSchema)
  .action(async ({ctx: {id}, parsedInput: {secretCode}}) => {
    try {
      return await prisma.team.update({
        where: {secretCode},
        data: {
          members: {
            connect: {id}
          }
        }
      });
    } catch(e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to update or create profile')
    }
  })

export const leaveTeam = authActionClient
  .metadata({actionName: "leaveTeam"})
  .schema(createTeamSchema)
  .action(async ({ctx: {id}}) => {
    try {
      return await prisma.team.update({
        where: {id},
        data: {
          members: {
            disconnect: {
              id
            }
          }
        }
      });
    } catch(e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to update or create profile')
    }
  })