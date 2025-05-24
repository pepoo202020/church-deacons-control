import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/prisma";
import { compare } from "bcryptjs";
import { RoleName } from "@/prisma/lib/generated/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: {
            roles: { include: { role: true } },
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          roles: user.roles.map((r) => r.role),
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On sign in, merge user info into token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.roles = (user as any).roles;
      }
      return token;
    },
    async session({ session, token }) {
      // Always populate session.user from token
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.roles = token.roles as string[];
      }
      return session;
    },
  },
};
