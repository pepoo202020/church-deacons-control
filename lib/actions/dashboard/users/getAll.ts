"use server";

import db from "@/lib/prisma";
import { User } from "@/prisma/lib/generated/prisma";
import { IActionResponse, LanguageType } from "@/types/types";

export default async function getAllUsers(
  language: LanguageType
): Promise<IActionResponse<User>> {
  try {
    const allUsers = await db.user.findMany();
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
