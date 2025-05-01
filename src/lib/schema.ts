import { CompetitionName } from '@prisma/client';
import { EventName, EventRegInstitution } from '@prisma/client';
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
  gender: z.enum(['L', 'P']).optional(),
  origin: z.string().optional(),
  major: z.string().optional(),
  phoneNumber: z.string().optional(),
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

export const eventRegistrationSchema = z
  .object({
    name: z.string().min(3).max(50),
    institutionType: z.nativeEnum(EventRegInstitution),
    nim: z.string().optional(),
    email: z.string().email(),
    institutionName: z.string().optional(),
    phoneNumber: z.string().min(8).max(15),
    followIG: z
      .instanceof(File)
      .array()
      .refine(
        (file) =>
          [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/svg+xml',
            'image/gif',
          ].includes(file[0].type),
        { message: 'Invalid image file type' }
      ),
    eventName: z.nativeEnum(EventName),
  })
  .refine(
    (data) => {
      if (data.institutionType === EventRegInstitution.ITB) {
        return !!data.nim;
      }
      return true;
    },
    { message: 'NIM is required for ITB students', path: ['nim'] }
  )
  .refine(
    (data) => {
      if (data.institutionType === EventRegInstitution.NON_ITB) {
        return !!data.institutionName;
      }
      return true;
    },
    {
      message: 'Institution name is required for non-ITB participants',
      path: ['institutionName'],
    }
  );
