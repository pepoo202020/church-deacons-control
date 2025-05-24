import { RoleName } from "@/prisma/lib/generated/prisma";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      roles: any[];
    } & DefaultSession["user"];
  }
}
