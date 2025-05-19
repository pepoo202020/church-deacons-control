import { LanguageType } from "@/types/types";
import { z, ZodObject } from "zod";

export const loginSchema = (lang: LanguageType) => {
  return z.object({
    email: z
      .string()
      .min(1, {
        message:
          lang === "AR"
            ? "الرجاء إدخال البريد الإلكتروني"
            : "Please enter your email",
      })
      .email({
        message: lang === "AR" ? "البريد الإلكتروني غير صالح" : "Invalid email",
      }),
    password: z.string().min(6, {
      message: lang === "AR" ? "كلمة المرور قصيرة" : "Password is too short",
    }),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
