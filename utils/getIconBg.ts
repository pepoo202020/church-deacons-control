import { RoleName } from "@/prisma/lib/generated/prisma";

export const getIconBg = (roleName: RoleName) => {
  const colors = {
    admin:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300",
    teacher: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
    student:
      "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
    controller: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300",
  };

  return (
    colors[roleName as keyof typeof colors] ||
    "bg-gray-100 text-gray-600 dark:bg-gray-900/50 dark:text-gray-300"
  );
};
