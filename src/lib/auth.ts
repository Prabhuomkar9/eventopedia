import { type DefaultSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/server/prisma';
import { type Role } from '@prisma/client';

/* Module augmentation for `next-auth` types.Allows us to add custom properties to the`session` object and keep type safety.
  @see https://next-auth.js.org/getting-started/typescript#module-augmentation */
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession["user"]
  }
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: session.user.email as string,
        },
      })

      if (!dbUser)
        throw new Error("User not found");

      session.user.id = dbUser.id;
      session.user.role = dbUser.role;

      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export default authOptions;
