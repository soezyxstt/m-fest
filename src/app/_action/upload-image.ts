'use server';

import { authActionClient } from '@/lib/safe-action';
import { uploadImageSchema } from '@/lib/schema';
import { prisma } from '@/server/prisma';
import { cloudinary } from '@/lib/cloudinary';

export const uploadImage = authActionClient
  .metadata({ actionName: 'uploadImage' })
  .schema(uploadImageSchema)
  .action(async ({ ctx: { id }, parsedInput: { file, prefix } }) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (!id) {
        throw new Error('Please submit the semester first!');
      }

      let data: object | null = null;

      await new Promise(async (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: prefix + '-' + id,
              resource_type: 'image',
            },
            async (err, callResult) => {
              if (err || !callResult) {
                reject(err);
                throw new Error('Failed to upload image');
              }

              const { secure_url } = callResult;

              data = await prisma.profile.update({
                where: { id },
                data: {
                  [prefix]: secure_url,
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
      throw new Error('Failed to upload image');
    }
  });
