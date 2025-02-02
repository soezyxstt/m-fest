'use server';

import { authActionClient } from '@/lib/safe-action';
import { prisma } from '@/server/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { registerSchema } from '@/lib/schema';
import { cloudinary } from '@/lib/cloudinary';

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
        const date = new Date().toLocaleString().replace(/[\/\s:]/g, '-');
        let data: object | null = null;

        await new Promise(async (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: 'payment-proof-' + id + '-' + date,
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
          revalidatePath('/team');
          revalidateTag('get_teams');
          revalidatePath('get_team');
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
