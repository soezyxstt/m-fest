import { CompetitionName } from '@prisma/client';
import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  ktm: z.string().url().optional(),
  pdDikti: z.string().url().optional(),
  followIG: z.string().url().optional(),
  twibbon: z.string().url().optional(),
  semester: z.number().int().positive().optional(),
  isLocked: z.boolean().optional(),
});
export const updateOrCreateProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  ktm: z.string().url().optional(),
  pdDikti: z.string().url().optional(),
  followIG: z.string().url().optional(),
  twibbon: z.string().url().optional(),
  semester: z.number().int().positive(),
  isLocked: z.boolean().optional(),
});
export const createTeamSchema = z.object({
  name: z.string(),
  institution: z.string(),
  phoneNumber: z.string(),
});
export const joinTeamSchema = z.object({
  secretCode: z.string(),
});

export const uploadImageSchema = z.object({
  file: z.instanceof(File),
  prefix: z.enum(['ktm', 'pdDikti', 'twibbon', 'followIG']),
});

export const registerSchema = z.object({
  teamId: z.string(),
  competitionName: z.enum([
    CompetitionName.BCC,
    CompetitionName.IPPC,
    CompetitionName.PDC,
    CompetitionName.STEM,
  ]),
  paymentProof: z.instanceof(File),
});

export const addTeacherSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  NUPTK: z.string(),
  gender: z.enum(['L', 'P']),
});