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

      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: prefix + '-' + id,
              resource_type: 'image',
            },
            (err, callResult) => {
              if (err || !callResult) {
                reject(err);
                return;
              }

              const { secure_url } = callResult;
            }
          )
          .end(buffer);
      });
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error('Failed to upload image');
    }
  });
