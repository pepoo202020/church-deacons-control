"use server";

import db from "@/lib/prisma";
import { Subject } from "@/prisma/lib/generated/prisma";
import { IActionResponse, LanguageType } from "@/types/types";

export default async function getAllSubjects(
  language: LanguageType
): Promise<IActionResponse<Subject>> {
  try {
    const allSubjects = await db.subject.findMany();
    return {
      success: true,
      data: allSubjects,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all Subjects"
          : "حدث خطأ غير معروف في جلب كل المواد",
    };
  }
}
