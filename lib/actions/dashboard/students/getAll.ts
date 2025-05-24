"use server";

import db from "@/lib/prisma";
import { Student } from "@/prisma/lib/generated/prisma";
import { IActionResponse, LanguageType } from "@/types/types";

export default async function getAllStudents(
  language: LanguageType
): Promise<IActionResponse<Student>> {
  try {
    const allStudents = await db.student.findMany();
    return {
      success: true,
      data: allStudents,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all students"
          : "حدث خطأ غير معروف في جلب كل الطلاب",
    };
  }
}
