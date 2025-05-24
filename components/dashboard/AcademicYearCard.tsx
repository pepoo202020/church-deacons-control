"use client";
import { Calendar } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export const AcademicYearCard = () => {
  const { language, isRTL } = useLanguage();

  // Sample data
  const academicYear = "2023-2024";
  const currentTerm =
    language === "AR" ? "الفصل الدراسي الثاني" : "Second Term";
  const status = language === "AR" ? "نشط" : "Active";

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-100/70 to-blue-200/80 dark:from-indigo-900/40 dark:to-blue-900/60 border-0 shadow-xl rounded-2xl transition-transform hover:scale-[1.025] hover:shadow-2xl duration-300">
      {/* Decorative Accent */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/20 dark:bg-blue-800/30 rounded-full blur-2xl pointer-events-none" />
      <CardContent className="px-3 py-2 sm:px-6 sm:py-3">
        <div
          className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-6 w-full ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Icon */}
          <div className="flex-shrink-0 flex items-center justify-center bg-blue-200 dark:bg-blue-900/60 p-2 sm:p-3 rounded-full shadow-lg border-2 border-blue-300 dark:border-blue-800">
            <Calendar className="h-7 w-7 sm:h-8 sm:w-8 text-blue-700 dark:text-blue-200" />
          </div>
          {/* Academic Year */}
          <div className="flex flex-col items-center sm:items-start mx-2">
            <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
              {language === "AR" ? "العام الدراسي" : "Academic Year"}
            </span>
            <span className="text-lg sm:text-2xl font-bold text-blue-900 dark:text-blue-100">
              {academicYear}
            </span>
          </div>
          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-blue-300 dark:bg-blue-800 mx-2" />
          {/* Current Term */}
          <div className="flex flex-col items-center sm:items-start mx-2">
            <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
              {language === "AR" ? "الفصل الدراسي الحالي" : "Current Term"}
            </span>
            <span className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-100">
              {currentTerm}
            </span>
          </div>
          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-blue-300 dark:bg-blue-800 mx-2" />
          {/* Status */}
          <div className="flex flex-col items-center sm:items-start mx-2">
            <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
              {language === "AR" ? "الحالة" : "Status"}
            </span>
            <Badge className="bg-gradient-to-r from-green-200 to-green-400 text-green-900 dark:bg-green-900/60 dark:text-green-200 border-0 shadow hover:from-green-300 hover:to-green-500 dark:hover:bg-green-800/80 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-bold rounded-full transition-all duration-200">
              {status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
