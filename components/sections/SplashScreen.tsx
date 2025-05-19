"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { checkAuthStatus } from "@/lib/auth";
import Logo from "../shared/Logo";
import { Loader2 } from "lucide-react";

const SplashScreen = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { isRTL, language } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      // Simulate a bit of delay for the splash screen to show
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const isAuthenticated = checkAuthStatus();

      if (isAuthenticated) {
        navigate.push("/dashboard");
      } else {
        navigate.push("/login");
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 text-white ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="text-center mb-8">
        <Logo size="LG" lang={language} splashScreen />
        <h1 className="text-4xl font-bold mb-4">
          {isRTL ? "مرحباً بك" : "Welcome"}
        </h1>
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
