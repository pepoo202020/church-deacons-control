import { z } from "zod";

export const editRoleSchema = (language: string) => {
  return z.object({
    description: z
      .string()
      .min(
        2,
        language === "AR"
          ? "حقل الوصف ضروري في تحديث الدور"
          : "Description Field is required in update the role"
      ),
  });
};

export type EditRoleFormValues = z.infer<ReturnType<typeof editRoleSchema>>;
