import { RoleName } from "@/prisma/lib/generated/prisma";

export const getGradient = (roleName: RoleName) => {
  const gradients = {
    admin:
      "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30",
    controller:
      "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30",
    student:
      "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30",
    teacher:
      "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30",
  };
  return (
    gradients[roleName as keyof typeof gradients] ||
    "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/30"
  );
};
