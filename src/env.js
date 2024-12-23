import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    AUTH_SECRET: z.string(),
    SESSION_MAX_AGE: z.preprocess(
      (str) => (str ? parseInt(str) : 24 * 60 * 60),
      z.number().int().positive().min(1)
    ),
    BASE_URL: z.string().url().default('http://localhost:3000'),
    GOOGLE_OAUTH_CLIENT_ID: z.string(),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
    SESSION_UPDATE_AGE: z.preprocess(
      (str) => (str ? parseInt(str) : 30 * 60),
      z.number().int().positive().min(1)
    ),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    SESSION_MAX_AGE: process.env.SESSION_MAX_AGE,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    SESSION_UPDATE_AGE: process.env.SESSION_UPDATE_AGE,
  },
  emptyStringAsUndefined: true,
});
