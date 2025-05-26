import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageType, RolesSortOption } from "@/types/types";
import React from "react";

interface RolesSortFilterProps {
  language: LanguageType;
  currentSort: RolesSortOption;
  onSortChange: (value: RolesSortOption) => void;
}

export const RolesSortFilter = ({
  language,
  currentSort,
  onSortChange,
}: RolesSortFilterProps) => {
  return (
    <Select
      value={currentSort}
      onValueChange={(value) => onSortChange(value as RolesSortOption)}
    >
      <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
        <SelectValue
          dir={language === "AR" ? "rtl" : "ltr"}
          placeholder={language === "AR" ? "ترتيب حسب" : "Sort by"}
        />
      </SelectTrigger>
      <SelectContent dir={language === "AR" ? "rtl" : "ltr"}>
        <SelectItem value="name-asc">
          {language === "AR" ? "الاسم (تصاعدي)" : "Name (A-Z)"}
        </SelectItem>
        <SelectItem value="name-desc">
          {language === "AR" ? "الاسم (تنازلي)" : "Name (Z-A)"}
        </SelectItem>
        <SelectItem value="users-asc">
          {language === "AR" ? "المستخدمين (تصاعدي)" : "Users (Low to High)"}
        </SelectItem>
        <SelectItem value="users-desc">
          {language === "AR" ? "المستخدمين (تنازلي)" : "Users (High to Low)"}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
