"use client";
import LoginForm from "@/components/forms/login/LoginForm";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LangThemeSelector } from "@/components/shared/LangThemeSelector";
import Logo from "@/components/shared/Logo";
import { useAuthStatus } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginPage() {
  const navigate = useRouter();
  const { language, isRTL } = useLanguage();
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (isAuthenticated) {
      navigate.push("/dashboard");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      <div className="flex justify-between items-center w-full  mb-8">
        <Logo size="SM" lang={language} />
        <LangThemeSelector />
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className={`text-${isRTL ? "right" : "left"}`}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {isRTL ? "مرحباً بعودتك" : "Welcome back"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isRTL
                ? "الرجاء تسجيل الدخول للمتابعة"
                : "Please sign in to continue"}
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
