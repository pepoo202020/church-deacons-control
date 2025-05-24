import { LanguageType } from "@/types/types";
import Logo from "./Logo";
import { Loader2 } from "lucide-react";

export const Loading = ({ language }: { language: LanguageType }) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 text-white ${
        language === "AR" ? "rtl" : "ltr"
      }`}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {language === "AR" ? "جاري التحميل" : "Loading"}
        </h1>
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
        </div>
      </div>
    </div>
  );
};
