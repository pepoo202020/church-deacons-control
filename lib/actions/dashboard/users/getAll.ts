"use server";

import db from "@/lib/prisma";
import { User } from "@/prisma/lib/generated/prisma";
import { IActionResponse, IUsersWithRoles, LanguageType } from "@/types/types";

export default async function getAllUsers(
  language: LanguageType
): Promise<IActionResponse<IUsersWithRoles>> {
  try {
    const allUsers = await db.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
            user: true,
          },
        },
      },
    });
    return {
      success: true,
      data: allUsers,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all Users"
          : "حدث خطأ غير معروف في جلب كل المستخدمين",
    };
  }
}
