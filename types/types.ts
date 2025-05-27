import {
  Classroom,
  Level,
  Role,
  User,
  UserRole,
} from "@/prisma/lib/generated/prisma";

export type LanguageType = "AR" | "EN";

export interface IActionResponse<T> {
  success: boolean;
  error?: string;
  data?: T | T[];
}

export interface IUserRoleWithUserAndRole extends UserRole {
  user: User;
  role: Role;
}
export interface IUsersWithRoles extends User {
  roles: IUserRoleWithUserAndRole[];
}

export type RolesSortOption =
  | "name-asc"
  | "name-desc"
  | "users-asc"
  | "users-desc";

export interface IUserRoleWithUser extends UserRole {
  user: User;
}

export interface IRoleWithUserRoles extends Role {
  users: IUserRoleWithUser[];
}

export interface IClassroomWithLevel extends Classroom {
  Level: Level;
}
