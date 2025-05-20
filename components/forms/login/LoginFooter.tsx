"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function LoginFooter() {
  const router = useRouter();
  const { isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CardFooter className="flex flex-col gap-4">
      <Button
        type="submit"
        form="login-form"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isRTL ? "يرجى الانتظار" : "Please wait"}
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            {isRTL ? "تسجيل الدخول" : "Sign In"}
          </>
        )}
      </Button>
    </CardFooter>
  );
}
