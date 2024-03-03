import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import prisma from '@/server/prisma';


export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "Enter your email" },
    //     password: { label: "Password", type: "password", placeholder: "Enter your password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials || !credentials.email || !credentials.password)
    //       return null;

    //     const user = await prisma.user.findFirst({
    //       where: {
    //         email: credentials.email,
    //       }
    //     })

    //     if (!user)
    //       return null;

    //     // Encrypt/Decrypt password here
    //     if (user.password !== credentials.password)
    //       return null;

    //     return user;
    //   }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    async session({ newSession, session, token, trigger, user }) {
      session.user = { id: user.id, name: user.name, email: user.email, image: user.image } as { id: string, name?: string | null | undefined, email?: string | null | undefined, image?: string | null | undefined };
      return session
    },
  },
};

export default authOptions;
