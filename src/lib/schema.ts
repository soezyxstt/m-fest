import {z} from 'zod';
import {Prisma} from '@prisma/client';

export const updateProfileSchema = z.custom<Prisma.ProfileUpdateInput>();
export const updateOrCreateProfileSchema = z.custom<Prisma.ProfileCreateInput>();
export const createTeamSchema = z.object({
  name: z.string(),
  institution: z.string(),
  phoneNumber: z.string()
});
export const joinTeamSchema = z.object({
  secretCode: z.string()
})

export const uploadImageSchema = z.object({
  file: z.instanceof(File),
  prefix: z.enum(['ktm', 'pdDikti', 'twibbon', 'followIG'])
});