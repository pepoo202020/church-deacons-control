"use client";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function LoginHeader() {
  const { isRTL } = useLanguage();

  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">
        {isRTL ? "تسجيل الدخول" : "Login"}
      </CardTitle>
      <CardDescription className="text-center">
        {isRTL
          ? "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك"
          : "Enter your credentials to access your account"}
      </CardDescription>
    </CardHeader>
  );
}
