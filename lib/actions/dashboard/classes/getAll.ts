"use server";

import db from "@/lib/prisma";
import { Classroom } from "@/prisma/lib/generated/prisma";
import { IActionResponse, LanguageType } from "@/types/types";

export default async function getAllClasses(
  language: LanguageType
): Promise<IActionResponse<Classroom>> {
  try {
    const allClasses = await db.classroom.findMany();
    return {
      success: true,
      data: allClasses,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all classes"
          : "حدث خطأ غير معروف في جلب كل الفصول",
    };
  }
}
