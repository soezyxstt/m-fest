'use server';

import { authActionClient } from '@/lib/safe-action';
import { uploadImageSchema } from '@/lib/schema';
import { prisma } from '@/server/prisma';
import { cloudinary } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export const uploadImage = authActionClient
  .metadata({ actionName: 'uploadImage' })
  .schema(uploadImageSchema)
  .action(async ({ ctx: { id }, parsedInput: { file, prefix } }) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const date = new Date().toLocaleString().replace(/[\/\s:]/g, '-');

      if (!id) {
        throw new Error('Please submit the semester first!');
      }

      let data: object | null = null;

      await new Promise(async (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: prefix + '-' + id + '-' + date,
              resource_type: 'image',
            },
            async (err, callResult) => {
              if (err || !callResult) {
                reject(err);
                return;
              }

              const { secure_url } = callResult;

              if (!secure_url) {
                reject(new Error('Failed to upload image'));
                throw new Error('Failed to upload image');
              }

              data = await prisma.profile.update({
                where: { id },
                data: {
                  [prefix]: secure_url,
                },
              });
            }
          )
          .end(buffer);
        revalidatePath('/dashboard');
        resolve(data);
      });
      return data;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to upload image');
    }
  });
