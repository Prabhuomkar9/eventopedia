import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import prisma from '@/server/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          }
        })

        if (!user)
          return null;

        // Encrypt/Decrypt password here
        if (user.password !== credentials.password)
          return null;

        return user;
      }
    }),
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
  },
  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {
      return true
    },
    async redirect({ baseUrl, url }) {
      return baseUrl
    },
    async session({ newSession, session, token, trigger, user }) {
      // // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      // console.log("session", session)
      // console.log("user", user)
      return session
    },
    async jwt({ account, token, user, profile, session, trigger }) {
      // // Persist the OAuth access_token to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token
      // }
      return token
    }
  },
  events: {
    async signIn(message) { /* on successful sign in */ },
    async signOut(message) { /* on signout */ },
    async createUser(message) { /* user created */ },
    async updateUser(message) { /* user updated - e.g. their email was verified */ },
    async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    async session(message) { /* session is active */ },
  }
};

export default authOptions;
