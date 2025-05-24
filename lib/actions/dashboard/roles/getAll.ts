"use server";

import db from "@/lib/prisma";
import { Role } from "@/prisma/lib/generated/prisma";
import { IActionResponse, LanguageType } from "@/types/types";

export default async function getAllRoles(
  language: LanguageType
): Promise<IActionResponse<Role>> {
  try {
    const allRoles = await db.role.findMany();
    return {
      success: true,
      data: allRoles,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all Roles"
          : "حدث خطأ غير معروف في جلب كل الادوار",
    };
  }
}
