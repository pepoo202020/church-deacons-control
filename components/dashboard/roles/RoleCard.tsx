"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RoleName } from "@/prisma/lib/generated/prisma";
import { IRoleWithUserRoles, LanguageType } from "@/types/types";
import { getBadgeColor } from "@/utils/getBadgeColor";
import { getGradient } from "@/utils/getGradient";
import { getIconBg } from "@/utils/getIconBg";
import { translateRole } from "@/utils/translateRoles";
import {
  BookOpen,
  Eye,
  LucideIcon,
  Pencil,
  Shield,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { DetailsDialog } from "./RoleCardActions/DetailsDialog";

const iconMap: Record<RoleName, LucideIcon> = {
  admin: Shield,
  controller: Eye,
  student: BookOpen,
  teacher: Pencil,
};

export const RoleCard = ({
  role,
  language,
}: {
  role: IRoleWithUserRoles;
  language: LanguageType;
}) => {
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [assignOpen, setAssignOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const IconComponent = iconMap[role.name] || Users;

  return (
    <>
      <Card
        className={`overflow-hidden bg-gradient-to-br ${getGradient(
          role.name
        )} border-0 shadow-md hover:shadow-lg transition-shadow h-fit`}
      >
        <CardContent className="p-3">
          <div className={`flex  items-center justify-between mb-4`}>
            <div className={`flex  items-center gap-4`}>
              {/* ROLE ICON */}
              <div
                className={`${getIconBg(
                  role.name
                )} p-3 rounded-full shadow-inner`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              {/* ROLE NAME AND NUMBER OF USERS */}
              <div>
                {/* ROLE NAME */}
                <h3 className="text-lg font-semibold">
                  {language === "AR" ? translateRole(role.name) : role.name}
                </h3>
                {/* NUMBER OF USERS */}
                <Badge className={getBadgeColor(role.name)}>
                  {language === "AR"
                    ? `${role.users.length} مستخدم`
                    : `${role.users.length} Users`}
                </Badge>
              </div>
            </div>
          </div>
          <div className={`flex gap-2 mt-4 justify-end`}>
            {/* DETAILS BTN */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => setDetailsOpen(true)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">
                {language === "AR" ? "عرض التفاصيل" : "View Details"}
              </span>
            </Button>
            {/* EDIT BTN */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">
                {language === "AR" ? "تعديل" : "Edit"}
              </span>
            </Button>
            {/* ASSIGN USERS BTN */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => setAssignOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              <span className="sr-only">
                {language === "AR" ? "تعيين مستخدمين" : "Assign Users"}
              </span>
            </Button>
            {/* DELETE BTN */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-100/50"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">
                {language === "AR" ? "حذف" : "Delete"}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <DetailsDialog
        isOpen={detailsOpen}
        language={language}
        onClose={setDetailsOpen}
        role={role}
      />
    </>
  );
};
