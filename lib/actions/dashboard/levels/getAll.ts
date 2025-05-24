"use server";

import db from "@/lib/prisma";
import { Level } from "@/prisma/lib/generated/prisma";
import { IActionResponse, LanguageType } from "@/types/types";

export default async function getAllLevels(
  language: LanguageType
): Promise<IActionResponse<Level>> {
  try {
    const allLevels = await db.level.findMany();
    return {
      success: true,
      data: allLevels,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all levels"
          : "حدث خطأ غير معروف في جلب كل المستويات",
    };
  }
}
