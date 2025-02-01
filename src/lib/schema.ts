import {z} from 'zod';
import {Prisma} from '@prisma/client';

export const updateProfileSchema = z.custom<Prisma.ProfileUpdateInput>();
export const updateOrCreateProfileSchema = z.custom<Prisma.ProfileCreateInput>();

export const uploadImageSchema = z.object({
  file: z.instanceof(File),
  prefix: z.enum(['ktm', 'pdDikti', 'twibbon', 'followIG'])
});