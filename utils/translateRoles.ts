import { RoleName } from "@/prisma/lib/generated/prisma";

export function translateRole(role: RoleName) {
  switch (role) {
    case "admin":
      return "مدير";
    case "controller":
      return "متحكم";
    case "student":
      return "طالب";
    case "teacher":
      return "مدرس";
  }
}
