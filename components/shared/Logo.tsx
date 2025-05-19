import { cn } from "@/lib/utils";
import { MAIN_PAGE_DATA } from "@/constants/main-page.data";
import { LanguageType } from "@/types/types";

export default function Logo({
  size,
  splashScreen = false,
  lang = "AR",
}: {
  size: "SM" | "MD" | "LG";
  splashScreen?: boolean;
  lang?: LanguageType;
}) {
  return (
    <div
      className={cn("flex items-center gap-2")}
      dir={lang === "EN" ? "ltr" : "rtl"}
    >
      {/* logo */}
      <div
        className={cn(
          splashScreen
            ? "bg-[url(/assets/dark-logo.png)]"
            : "bg-[url(/assets/light-logo.jpg)] dark:bg-[url(/assets/dark-logo.png)]",
          size === "SM"
            ? "w-10 h-10"
            : size === "MD"
            ? "w-28 h-28"
            : "w-32 h-32",
          "bg-center bg-contain bg-no-repeat"
        )}
      />
      {/* application name */}
      <div
        className={cn(
          size === "SM" ? "text-xs" : size === "MD" ? "text-2xl" : "text-5xl",
          "flex flex-col items-start justify-center ",
          "font-bold",
          splashScreen ? "text-white" : "text-blue-950 dark:text-white"
        )}
      >
        {MAIN_PAGE_DATA.mainTitle[lang].split(" ").map((char, index) => {
          return <span key={index}>{char}</span>;
        })}
      </div>
    </div>
  );
}
