"use client";
import { LanguageType } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Set AR as default language
  const [language, setLanguage] = useState<LanguageType>(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language") as LanguageType;
      return storedLang || "AR";
    }
    return "AR";
  });

  const isRTL = language === "AR";

  // Update document direction and store preference
  useEffect(() => {
    const dir = isRTL ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language.toLowerCase();
    localStorage.setItem("language", language);
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
