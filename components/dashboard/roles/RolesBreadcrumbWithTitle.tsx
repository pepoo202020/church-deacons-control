import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LanguageType } from "@/types/types";
import React from "react";

export const RolesBreadcrumbWithTitle = ({
  language,
}: {
  language: LanguageType;
}) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              {language === "AR" ? "لوحة التحكم" : "Dashboard"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              {language === "AR" ? "الأدوار" : "Roles"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mt-2 text-blue-700 dark:text-blue-300">
        {language === "AR" ? "إدارة الأدوار" : "Roles Management"}
      </h1>
    </div>
  );
};
