"use server";

import {auth} from '@/auth';
import {actionClient, authActionClient} from '@/lib/safe-action';
import {updateOrCreateProfileSchema, updateProfileSchema} from '@/lib/schema';
import {prisma} from '@/server/prisma';

export async function getProfile() {
  const email = (await auth())?.user?.email ?? "";
  return prisma.profile.findUnique({
    where: {email},
    include: {team: true}
  });
}

export async function getProfileByEmail({email}: { email: string }) {
  return prisma.profile.findUnique({
    where: {email},
    include: {team: true}
  });
}

export const updateProfile = authActionClient
  .metadata({actionName: "updateProfile"})
  .schema(updateProfileSchema)
  .action(async ({ctx: {id}, parsedInput}) => {
    try {
      return await prisma.profile.update({
        where: {id},
        data: parsedInput
      });
    } catch {
      throw new Error('Failed to update profile')
    }
  })

export const updateOrCreateProfile = actionClient
  .metadata({actionName: "updateOrCreateProfile"})
  .schema(updateOrCreateProfileSchema)
  .action(async ({parsedInput}) => {
    try {
      const id = (await prisma.profile.findUnique({where: {email: parsedInput.email}}))?.id;
      if (id) {
        return await prisma.profile.update({
          where: {id},
          data: parsedInput
        });
      } else {
        return await prisma.profile.create({
          data: parsedInput
        });
      }
    } catch {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to update or create profile')
    }
  })