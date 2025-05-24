import { UsersIcon } from "lucide-react";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";

export const MENU_ITEMS = [
  {
    title: { AR: "لوحة التحكم", EN: "Dashboard" },
    path: "/dashboard",
    Icon: MdDashboard,
    access: ["all"],
  },
  {
    title: { AR: "الصلاحيات", EN: "Roles" },
    path: "/dashboard/roles",
    Icon: MdAdminPanelSettings,
    access: ["admin"],
  },
  {
    title: { AR: "المستخدمين", EN: "Users" },
    path: "/dashboard/users",
    Icon: UsersIcon,
    access: ["all"],
  },
];
