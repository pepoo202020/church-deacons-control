import { Role } from "@/prisma/lib/generated/prisma";
import React from "react";

export const RolesSelector = ({ roles }: { roles: Role[] }) => {
  return roles.length === 1 ? (
    <div className="mx-1 sm:mx-2 text-xs sm:text-sm">roles</div>
  ) : null;
};
