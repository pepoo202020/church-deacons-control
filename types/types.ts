import { User, UserRole } from "@/prisma/lib/generated/prisma";

export type LanguageType = "AR" | "EN";

export interface IActionResponse<T> {
  success: boolean;
  error?: string;
  data?: T | T[];
}

export interface IUsersWithRoles extends User {
  roles: UserRole[];
}
