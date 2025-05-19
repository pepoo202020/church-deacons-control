import { z } from "zod";

export const forgotPasswordSchema = (language: string) => {
  return z.object({
    email: z
      .string()
      .min(1, {
        message:
          language === "AR" ? "البريد الإلكتروني مطلوب" : "Email is required",
      })
      .email({
        message:
          language === "AR"
            ? "البريد الإلكتروني غير صالح"
            : "Invalid email address",
      }),
  });
};

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
