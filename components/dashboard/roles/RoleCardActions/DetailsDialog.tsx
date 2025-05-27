"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IRoleWithUserRoles, LanguageType } from "@/types/types";
import { translateRole } from "@/utils/translateRoles";
import {
  LucideIcon,
  Pencil,
  Trash2,
  User,
  UserPlus,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const DetailsRoleDialog = ({
  isOpen,
  onClose,
  language,
  role,
}: {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageType;
  role: IRoleWithUserRoles;
}) => {
  const isMobile = useIsMobile();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [assignOpen, setAssignOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const handleDeAssignUser = (userId: string) => {
    toast(language === "AR" ? "تم إلغاء تعيين المستخدم" : "User deassigned", {
      description:
        language === "AR"
          ? `تم إلغاء تعيين المستخدم من دور ${role.name} بنجاح`
          : `User has been successfully deassigned from ${role.name} role`,
    });
  };

  const detailsContent = (
    <div className={`${language === "AR" ? "rtl" : "ltr"}`}>
      <div className="space-y-4 mb-5">
        {/* Role Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
            {language === "AR" ? "معلومات الدور" : "Role Information"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {language === "AR" ? "الاسم" : "Name"}
              </span>
              <p className="font-semibold">
                {language === "AR" ? translateRole(role.name) : role.name}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {language === "AR" ? "عدد المستخدمين" : "Users Count"}
              </span>
              <p className="font-semibold">{role.users.length}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {language === "AR" ? "الوصف" : "Description"}
              </span>
              <p>{role.description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Assigned Users */}
      <div>
        <h3 className="text-lg font-medium mb-3">
          {language === "AR" ? "المستخدمون المعينون" : "Assigned Users"}
          <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
            {role.users.length}
          </Badge>
        </h3>
        {role.users.length === 0 ? (
          <div className="w-full text-center">
            {language === "AR"
              ? "لا يوجد اي مستخدمين لديهم هذا الدور"
              : "There is no users with this role"}
          </div>
        ) : (
          <div className="overflow-auto max-h-[300px] border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {language === "AR" ? "الاسم" : "Name"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {language === "AR" ? "البريد الإلكتروني" : "Email"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {language === "AR" ? "إجراءات" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {role.users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-3">
                          <span>{user.user.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeAssignUser(user.user.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        {language === "AR" ? "إلغاء التعيين" : "Deassign"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const actionButtons = (
    <div className={`flex gap-2`}>
      <Button variant="outline" onClick={() => setEditOpen(true)}>
        <Pencil className="h-4 w-4 mr-2" />
        {language === "AR" ? "تعديل" : "Edit"}
      </Button>
      <Button variant="outline" onClick={() => setAssignOpen(true)}>
        <UserPlus className="h-4 w-4 mr-2" />
        {language === "AR" ? "تعيين مستخدمين" : "Assign Users"}
      </Button>
      <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
        <Trash2 className="h-4 w-4 mr-2" />
        {language === "AR" ? "حذف" : "Delete"}
      </Button>
      <Button variant="secondary" onClick={onClose} className="ml-auto">
        <X className="h-4 w-4 mr-2" />
        {language === "AR" ? "إغلاق" : "Close"}
      </Button>
    </div>
  );
  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="bottom" className="min-h-fit p-5">
            <SheetHeader className="text-center">
              <SheetTitle>
                {language === "AR"
                  ? `تفاصيل الدور: ${translateRole(role.name)}`
                  : `Role Details: ${role.name}`}
              </SheetTitle>
              <SheetDescription>
                {language === "AR"
                  ? `عرض تفاصيل ومستخدمي دور ال${translateRole(role.name)}`
                  : `View details and users for ${role.name} role`}
              </SheetDescription>
            </SheetHeader>
            {detailsContent}
            <SheetFooter className="mt-6">{actionButtons}</SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center">
                {language === "AR"
                  ? `تفاصيل الدور: ${translateRole(role.name)}`
                  : `Role Details: ${role.name}`}
              </DialogTitle>
              <DialogDescription className="text-center">
                {language === "AR"
                  ? `عرض تفاصيل ومستخدمي دور ال${translateRole(role.name)}`
                  : `View details and users for ${role.name} role`}
              </DialogDescription>
            </DialogHeader>
            {detailsContent}
            <DialogFooter className="mt-6">{actionButtons}</DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
