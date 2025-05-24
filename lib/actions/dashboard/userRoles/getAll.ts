"use server";

import db from "@/lib/prisma";
import { IActionResponse, IUsersWithRoles, LanguageType } from "@/types/types";

export async function getAllTeachers(
  language: LanguageType
): Promise<IActionResponse<IUsersWithRoles>> {
  try {
    const userWithRoles = await db.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    const teacherUsers = new Set<IUsersWithRoles>();
    userWithRoles.forEach((user) => {
      user.roles.forEach((userRole) => {
        if (userRole.role.name === "teacher") {
          teacherUsers.add(user);
        }
      });
    });

    return {
      success: true,
      data: Array.from(teacherUsers),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all Teachers"
          : "حدث خطأ غير معروف في جلب كل المدرسين",
    };
  }
}

export async function getAllControllers(
  language: LanguageType
): Promise<IActionResponse<IUsersWithRoles>> {
  try {
    const userWithRoles = await db.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    const controllerUsers = new Set<IUsersWithRoles>();
    userWithRoles.forEach((user) => {
      user.roles.forEach((userRole) => {
        if (userRole.role.name === "controller") {
          controllerUsers.add(user);
        }
      });
    });

    return {
      success: true,
      data: Array.from(controllerUsers),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in get all Controllers"
          : "حدث خطأ غير معروف في جلب كل المتحكمين",
    };
  }
}
