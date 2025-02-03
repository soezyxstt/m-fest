import {auth} from '@/auth';
import {prisma} from '@/server/prisma';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import {z} from 'zod';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action Error ->', e.message);

    return e.message ?? DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  defaultValidationErrorsShape: 'flattened',
  // Define logging middleware.
}).use(async ({next, clientInput, metadata}) => {
  console.log('LOGGING MIDDLEWARE');

  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  console.log('Result ->', result);
  console.log('Client input ->', clientInput);
  console.log('Metadata ->', metadata);
  console.log('Action execution took', endTime - startTime, 'ms');

  // And then return the result of the awaited action.
  return result;
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({next}) => {
    const session = await auth();

    if (!session) {
      throw new Error('Session not found!');
    }

    const profile = await prisma.profile.findUnique({
      where: {email: session?.user?.email ?? ""},
    });

    if (!profile) {
      throw new Error('Please submit your semester first!');
    }

    // Return the next middleware with `userId` value in the context
    return next({ctx: {id: profile.id}});
  });