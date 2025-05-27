"use client";
import { CustomDialog } from "@/components/shared/CustomDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import getAllClasses from "@/lib/actions/dashboard/classes/getAll";
import getAllUsers from "@/lib/actions/dashboard/users/getAll";
import { Classroom } from "@/prisma/lib/generated/prisma";
import {
  IClassroomWithLevel,
  IRoleWithUserRoles,
  IUsersWithRoles,
  LanguageType,
} from "@/types/types";
import { translateRole } from "@/utils/translateRoles";
import { Check, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AssignUsersDialog = ({
  isOpen,
  language,
  onClose,
  role,
}: {
  isOpen: boolean;
  language: LanguageType;
  onClose: () => void;
  role: IRoleWithUserRoles;
}) => {
  const isAdminRole = role.name === "admin";
  const [step, setStep] = useState<"users" | "classes">("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState<IUsersWithRoles[]>([]);
  const [allClasses, setAllClasses] = useState<IClassroomWithLevel[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    role.users.map((user) => user.userId)
  );
  const [selectedUserClasses, setSelectedUserClasses] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers(language);
      setAllUsers(response.data as IUsersWithRoles[]);
    };
    const getClasses = async () => {
      const response = await getAllClasses(language);
      setAllClasses(response.data as IClassroomWithLevel[]);
    };
    getUsers();
    getClasses();
    return () => {
      getUsers();
      getClasses();
    };
  }, []);

  const getAvailableUsers = () => {
    let availableUsers: IUsersWithRoles[] = [];

    if (isAdminRole) {
      availableUsers = allUsers;
    } else {
      availableUsers = allUsers.filter(
        (user) =>
          !user.roles.some(
            (userRole) =>
              userRole.roleId === role.id || userRole.role.name === "admin"
          )
      );
    }
    return availableUsers;
  };

  getAvailableUsers();

  // Filter users based on search term
  const filteredUsers = getAvailableUsers().filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTitle = (lang: LanguageType) => {
    if (isAdminRole) {
      return lang === "AR"
        ? `تعيين مستخدمين لدور ال${translateRole(role.name)}`
        : `Assign Users to ${role.name} Role`;
    }

    return step === "users"
      ? lang === "AR"
        ? `تعيين مستخدمين لدور ال${translateRole(role.name)}`
        : `Assign Users to ${role.name} Role`
      : lang === "AR"
      ? "تعيين الفصول للمستخدمين"
      : "Assign Classes to Users";
  };

  const getDescription = (lang: LanguageType) => {
    if (isAdminRole) {
      return lang === "AR"
        ? "حدد المستخدمين لتعيينهم لهذا الدور"
        : "Select users to assign to this role";
    }

    return step === "users"
      ? lang === "AR"
        ? "حدد المستخدمين ثم قم بتعيين الفصول لهم"
        : "Select users then assign classes to them"
      : lang === "AR"
      ? "قم بتعيين الفصول للمستخدمين المحددين"
      : "Assign classes to the selected users";
  };

  // Handle user selection
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      // Remove user's class selections if deselected
      const updatedUserClasses = { ...selectedUserClasses };
      delete updatedUserClasses[userId];
      setSelectedUserClasses(updatedUserClasses);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      // Initialize empty class selection for new user
      setSelectedUserClasses({ ...selectedUserClasses, [userId]: [] });
    }
  };
  // Get selected user objects
  const getSelectedUserObjects = () => {
    return allUsers.filter((user) => selectedUsers.includes(user.id));
  };

  const usersStepContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search">
          {language === "AR" ? "البحث عن مستخدمين" : "Search Users"}
        </Label>
        <Input
          id="search"
          placeholder={
            language === "AR"
              ? "البحث بالاسم أو البريد الإلكتروني..."
              : "Search by name or email..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 bg-white dark:bg-gray-800"
        />
      </div>
      {/* Users list */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>
            {language === "AR" ? "المستخدمون المتاحون" : "Available Users"}
          </Label>
          <Badge variant="outline" className="bg-blue-50 text-blue-800">
            {filteredUsers.length} {language === "AR" ? "مستخدم" : "users"}
          </Badge>
        </div>
        <div className="border rounded-md overflow-hidden max-h-[300px] overflow-y-auto">
          <div className="divide-y">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex  items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50`}
              >
                <div className={`flex items-center gap-3`}>
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                  />
                  <Label
                    htmlFor={`user-${user.id}`}
                    className="flex flex-col cursor-pointer flex-1"
                  >
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </Label>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                {language === "AR"
                  ? "لم يتم العثور على مستخدمين"
                  : "No users found"}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Selected users summary */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="mb-2 block">
            {language === "AR" ? "المستخدمون المحددون" : "Selected Users"}
          </Label>
          <Badge variant="outline" className="bg-blue-50 text-blue-800">
            {getSelectedUserObjects().length}{" "}
            {language === "AR" ? "مستخدم" : "users"}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedUsers.length > 0 ? (
            getSelectedUserObjects().map((user) => (
              <Badge
                key={user.id}
                variant="outline"
                className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 cursor-pointer"
                onClick={() => toggleUserSelection(user.id)}
              >
                {user.name} ✕
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">
              {language === "AR"
                ? "لم يتم تحديد أي مستخدم"
                : "No users selected"}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Handle next step
  const handleNextStep = () => {
    if (isAdminRole || step === "classes") {
      // Submit the form for admin role or after class assignment
      toast(language === "AR" ? "تم تعيين المستخدمين" : "Users Assigned", {
        description:
          language === "AR"
            ? `تم تعيين ${selectedUsers.length} مستخدم لدور ${role.name} بنجاح`
            : `${selectedUsers.length} users have been assigned to ${role.name} role successfully`,
      });
      onClose();
    } else {
      // Go to class assignment step for non-admin roles
      setStep("classes");
    }
  };

  // Handle going back to users step
  const handleBackToUsers = () => {
    setStep("users");
  };
  // Handle class selection for a user
  const toggleClassSelection = (userId: string, classId: string) => {
    const userClasses = selectedUserClasses[userId] || [];

    if (userClasses.includes(classId)) {
      setSelectedUserClasses({
        ...selectedUserClasses,
        [userId]: userClasses.filter((id) => id !== classId),
      });
    } else {
      setSelectedUserClasses({
        ...selectedUserClasses,
        [userId]: [...userClasses, classId],
      });
    }
  };

  const classesStepContent = (
    <div className={` space-y-6`}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>
            {language === "AR"
              ? "تعيين الفصول للمستخدمين المحددين"
              : "Assign Classes to Selected Users"}
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToUsers}
            className="text-xs"
          >
            {language === "AR" ? "عودة لتحديد المستخدمين" : "Back to Users"}
          </Button>
        </div>

        <div className="border rounded-md overflow-hidden max-h-[400px] overflow-y-auto">
          <Accordion type="multiple" className="w-full">
            {selectedUsers.length > 0 ? (
              getSelectedUserObjects().map((user) => (
                <AccordionItem key={user.id} value={`user-${user.id}`}>
                  <AccordionTrigger className="px-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{user.name}</span>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-50 text-blue-800"
                      >
                        {(selectedUserClasses[user.id] || []).length}{" "}
                        {language === "AR" ? "فصل" : "classes"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-3 py-2">
                      {allClasses.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          {language === "AR"
                            ? "لا يوجد اي فصول متاحة"
                            : "No found classes"}
                        </div>
                      ) : (
                        allClasses.map((classItem) => (
                          <div
                            key={classItem.id}
                            className="flex items-center space-x-2 py-1"
                          >
                            <Checkbox
                              id={`user-${user.id}-class-${classItem.id}`}
                              checked={(
                                selectedUserClasses[user.id] || []
                              ).includes(classItem.id)}
                              onCheckedChange={() =>
                                toggleClassSelection(user.id, classItem.id)
                              }
                            />
                            <Label
                              htmlFor={`user-${user.id}-class-${classItem.id}`}
                              className="flex flex-col cursor-pointer"
                            >
                              <span>{classItem.name}</span>
                              <span className="text-xs text-gray-500">
                                {classItem.Level.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {classItem.isActive}
                              </span>
                            </Label>
                          </div>
                        ))
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                {language === "AR"
                  ? "لم يتم تحديد أي مستخدم"
                  : "No users selected"}
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );

  // The buttons for both dialog and sheet
  const actionButtons = (
    <div className={`flex  gap-2 justify-end`}>
      <Button type="button" variant="outline" onClick={onClose}>
        {language === "AR" ? "إلغاء" : "Cancel"}
      </Button>
      <Button
        type="button"
        onClick={handleNextStep}
        disabled={selectedUsers.length === 0}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        {step === "users" && !isAdminRole ? (
          <>
            {language === "AR" ? "التالي" : "Next"}
            {language === "AR" ? (
              <ChevronLeft className="h-4 w-4 ml-2" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </>
        ) : (
          <>
            {language === "AR" ? "تأكيد التعيين" : "Confirm Assignment"}
            <Check className="h-4 w-4 mr-2" />
          </>
        )}
      </Button>
    </div>
  );

  const detailsContent = isAdminRole
    ? usersStepContent
    : step === "users"
    ? usersStepContent
    : classesStepContent;
  return (
    <>
      <CustomDialog
        arabicDescription={getDescription(language)}
        arabicTitle={getTitle(language)}
        detailsContent={detailsContent}
        englishDescription={getDescription(language)}
        englishTitle={getTitle(language)}
        handleClose={onClose}
        isOpen={isOpen}
        language={language}
        actionButtons={actionButtons}
      />
    </>
  );
};
