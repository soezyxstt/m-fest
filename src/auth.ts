import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { env } from '@/env';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
      async profile(profile) {
        return { ...profile };
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/error',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      
      return session;
    },
  },
  session: {
    maxAge: env.SESSION_MAX_AGE,
    strategy: 'jwt',
    updateAge: env.SESSION_UPDATE_AGE,
  }
});
