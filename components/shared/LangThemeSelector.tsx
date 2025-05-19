"use client";
import { useLanguage } from "../providers/LanguageProvider";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Languages } from "lucide-react";
import { ModeToggle } from "./ModeToggler";

export function LangThemeSelector() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [mounted, setMounted] = useState<boolean>(false);

  // After mounting, we have access to the window object
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by only rendering after mounting
  if (!mounted) return null;

  return (
    <div
      className={`flex items-center gap-4 ${
        isRTL ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "AR" ? "EN" : "AR")}
        aria-label="Toggle language"
        className="w-9 px-0"
      >
        <Languages className="h-4 w-4" />
        <span className="ml-2 text-xs">{language}</span>
      </Button>

      <ModeToggle />
    </div>
  );
}
