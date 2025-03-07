'use server';

import { auth } from '@/auth';
import { actionClient, authActionClient } from '@/lib/safe-action';
import { updateOrCreateProfileSchema, updateProfileSchema } from '@/lib/schema';
import { prisma } from '@/server/prisma';
import {
  unstable_cache,
  revalidateTag as rT,
  revalidatePath as rP,
} from 'next/cache';

export async function getProfile() {
  const email = (await auth())?.user?.email ?? '';
  return prisma.profile.findUnique({
    where: { email },
    include: {
      team: {
        include: {
          registration: {
            include: {
              competition: true,
            },
          },
        },
      },
    },
  });
}

const date = new Date().toLocaleString().replace(/[\/\s:]/g, '-');

export const getCachedProfile = unstable_cache(
  async (email: string) => {
    return prisma.profile.findUnique({
      where: { email },
      include: { team: true },
    });
  },
  ['get_profile-' + date],
  { tags: ['get_profile'] }
);

export async function getProfileByEmail({ email }: { email: string }) {
  return prisma.profile.findUnique({
    where: { email },
    include: { team: true },
  });
}

export const revalidatePath = rP;
export const revalidateTag = rT;

export const getProfileByEmailAction = actionClient
  .metadata({ actionName: 'getProfileByEmail' })
  .action(async () => {
    return await getProfile();
  });

export const updateProfile = authActionClient
  .metadata({ actionName: 'updateProfile' })
  .schema(updateProfileSchema)
  .action(async ({ ctx: { id }, parsedInput }) => {
    try {
      return await prisma.profile.update({
        where: { id },
        data: parsedInput,
      });
    } catch {
      throw new Error('Failed to update profile');
    }
  });

export const updateOrCreateProfile = actionClient
  .metadata({ actionName: 'updateOrCreateProfile' })
  .schema(updateOrCreateProfileSchema)
  .action(async ({ parsedInput }) => {
    try {
      const id = (
        await prisma.profile.findUnique({ where: { email: parsedInput.email } })
      )?.id;
      if (id) {
        return await prisma.profile.update({
          where: { id },
          data: parsedInput,
        });
      } else {
        return await prisma.profile.create({
          data: parsedInput,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to update or create profile');
    }
  });
