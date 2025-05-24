"use client";
import { LanguageType } from "@/types/types";
import React, { useState } from "react";
import Logo from "../shared/Logo";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const NoRoles = ({ language }: { language: LanguageType }) => {
  const isAR = language === "AR";
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await signOut();
      toast.info(
        language === "AR" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
        {
          description:
            language === "AR"
              ? "يمكنك تسجيل الدخول مرة أخرى"
              : "You can login again",
        }
      );
      router.refresh();
    } catch (error) {
      toast.error(language === "AR" ? "حدث خطأ ما" : "Something went wrong", {
        description:
          language === "AR" ? "لا يمكنك تسجيل الخروج" : "You can't logout",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="absolute z-[900] inset-0 h-screen w-screen bg-neutral-300 dark:bg-blue-950 text-blue-950 dark:text-white flex flex-col items-center justify-center">
      <Logo size="LG" lang={language} />
      <h1 className="text-3xl font-bold mt-6 mb-2">
        {isAR ? "لا توجد صلاحيات" : "No Roles Assigned"}
      </h1>
      <p className="mb-8 text-lg text-center max-w-md">
        {isAR
          ? "عذراً، ليس لديك أي صلاحيات للوصول إلى النظام. يرجى التواصل مع الإدارة إذا كنت تعتقد أن هذا خطأ."
          : "Sorry, you do not have any roles assigned to access the system. Please contact administration if you believe this is a mistake."}
      </p>
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
      >
        <LogOut className="w-5 h-5" />
        {isAR ? "تسجيل الخروج" : "Logout"}
      </button>
    </div>
  );
};
