"use server";

import db from "@/lib/prisma";
import {
  IActionResponse,
  IRoleWithUserRoles,
  LanguageType,
} from "@/types/types";

export default async function getAllRoles(
  language: LanguageType
): Promise<IActionResponse<IRoleWithUserRoles>> {
  try {
    const allRoles = await db.role.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
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
