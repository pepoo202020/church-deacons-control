import { Role } from "@/prisma/lib/generated/prisma";
import { LanguageType } from "@/types/types";
import { translateRole } from "@/utils/translateRoles";

export const MainRole = ({
  role,
  language,
}: {
  role: Role;
  language: LanguageType;
}) => {
  return (
    <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mx-2 sm:mx-4 text-center">
      {language === "AR" ? "لوحة التحكم لل" : "Dashboard For "}
      {language === "AR" ? translateRole(role.name) : role.name}
    </div>
  );
};
