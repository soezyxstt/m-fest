'use server';

import { actionClient, authActionClient } from '@/lib/safe-action';
import { prisma } from '@/server/prisma';
import {
  addTeacherSchema,
  eventRegistrationSchema,
  registerSchema,
} from '@/lib/schema';
import { cloudinary } from '@/lib/cloudinary';
import { z } from 'zod';

export const register = authActionClient
  .metadata({ actionName: 'register' })
  .schema(registerSchema)
  .action(
    async ({
      ctx: { id },
      parsedInput: { teamId, competitionName, paymentProof },
    }) => {
      try {
        const competition = await prisma.competition.findFirst({
          where: { name: competitionName },
        });

        if (!competition) {
          throw new Error('Competition not found');
        }

        const arrayBuffer = await paymentProof.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        let data: object | null = null;

        await new Promise(async (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: 'payment-proof-' + id,
                resource_type: 'image',
              },
              async (err, callResult) => {
                if (err || !callResult) {
                  reject(err);
                  return;
                }

                const { secure_url } = callResult;
                data = await prisma.registration.create({
                  data: {
                    team: {
                      connect: { id: teamId },
                    },
                    competition: {
                      connect: { id: competition.id },
                    },
                    paymentProofUrl: secure_url,
                  },
                });
              }
            )
            .end(buffer);
          resolve(data);
        });
        return data;
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error('Failed to register');
      }
    }
  );

export const addTeacher = authActionClient
  .metadata({ actionName: 'addTeacher' })
  .schema(addTeacherSchema)
  .action(
    async ({
      ctx: { id },
      parsedInput: { name, email, phoneNumber, NUPTK, gender },
    }) => {
      try {
        const team = await prisma.team.findFirst({
          where: { members: { some: { id } } },
        });

        const teacher = await prisma.teacher.findFirst({
          where: { email },
        });

        if (teacher) {
          throw new Error('Teacher already exists');
        }

        const r = await prisma.teacher.create({
          data: {
            name,
            email,
            phoneNumber,
            gender,
            NUPTK,
            team: {
              connect: { id: team?.id },
            },
          },
        });

        if (!r) {
          throw new Error('Failed to add teacher');
        }

        return r;
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error('Failed to add teacher');
      }
    }
  );

export const updateVerified = authActionClient
  .metadata({ actionName: 'updateVerified' })
  .schema(
    z.object({
      id: z.string(),
      isVerified: z.boolean(),
    })
  )
  .action(async ({ parsedInput: { id, isVerified } }) => {
    try {
      const result = await prisma.registration.update({
        where: { id },
        data: { isVerified },
      });

      if (!result) {
        throw new Error('Failed to update verification status');
      }

      return result;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to update verification status');
    }
  });

export const registerEvent = actionClient
  .metadata({ actionName: 'registerEvent' })
  .schema(eventRegistrationSchema)
  .action(
    async ({
      parsedInput: {
        name,
        eventName,
        institutionType,
        institutionName,
        nim,
        followIG,
        phoneNumber,
        email,
        day1,
        day2,
      },
    }) => {
      try {
        const arrayBuffer = await followIG[0].arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let data: object | null = null;

        console.log("xxx");

        await new Promise(async (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: `follow-ig-proof-${name}-${phoneNumber}`,
                resource_type: 'image',
              },
              async (err, callResult) => {
                if (err || !callResult) {
                  reject(err);
                  return;
                }

                const { secure_url } = callResult;
                data = await prisma.eventRegistration.create({
                  data: {
                    name,
                    eventName,
                    institutionType,
                    institutionName,
                    nim,
                    phoneNumber,
                    email,
                    followIG: secure_url,
                    day: day1 ? day2 ? "BOTH" : "DAY_1" : "DAY_2",
                  },
                });
              }
            )
            .end(buffer);
          resolve(data);
        });

        return data;
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error('Failed to register for the event');
      }
    }
  );

export const updateEventRegistration = actionClient
  .metadata({ actionName: 'updateEventRegistration' })
  .schema(
    z.object({
      id: z.string(),
      checked: z.boolean(),
    })
  )
  .action(
    async ({
      parsedInput: {
        id,
        checked
      },
    }) => {
      try {
        const data = await prisma.eventRegistration.update({
          where: { id },
          data: {
            checked,
          },
        });

        if (!data) {
          throw new Error('Failed to update event registration');
        }

        return data;
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error('Failed to update event registration');
      }
    }
  );