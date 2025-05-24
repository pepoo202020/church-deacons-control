"use server";

import db from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { IActionResponse, LanguageType } from "@/types/types";

export async function forgetPassword(
  email: string,
  language: LanguageType
): Promise<IActionResponse<any>> {
  try {
    const existUser = await db.user.findUnique({ where: { email } });
    if (!existUser) {
      return {
        success: false,
        error:
          language === "AR" ? "هذا البريد غير مسجل" : "Email is not registered",
      };
    }

    const adminEmail = process.env.ADMIN_EMAIL as string;

    // Prepare the email
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/login`;

    await sendEmail(
      {
        name: existUser.name,
        email: existUser.email,
        url,
        SendTo: "Abanob Shenoda",
      },
      "forgetPassword",
      adminEmail,
      "🔒 Reset Your Password — Action Required"
    );
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : language === "EN"
          ? "Unknown Error in forget password"
          : "حدث خطأ غير معروف في إعادة تعيين كلمة المرور",
    };
  }
}
