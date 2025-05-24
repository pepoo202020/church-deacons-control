import { cn } from "@/lib/utils";
import { MAIN_PAGE_DATA } from "@/constants/main-page.data";
import { LanguageType } from "@/types/types";
import Link from "next/link";

export default function Logo({
  size,
  splashScreen = false,
  lang = "AR",
  header = false,
  href,
}: {
  size: "SM" | "MD" | "LG";
  splashScreen?: boolean;
  lang?: LanguageType;
  header?: boolean;
  href?: string;
}) {
  const logoContent = (
    <div
      className={cn("flex items-center gap-2", href && "cursor-pointer")}
      dir={lang === "EN" ? "ltr" : "rtl"}
    >
      {/* logo */}
      <div
        className={cn(
          splashScreen || header
            ? "bg-[url(/assets/darkLogo.png)]"
            : "bg-[url(/assets/lightLogo.jpg)] dark:bg-[url(/assets/darkLogo.png)]",
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
          splashScreen || header
            ? "text-white"
            : "text-blue-950 dark:text-white"
        )}
      >
        {MAIN_PAGE_DATA.mainTitle[lang].split(" ").map((char, index) => {
          return <span key={index}>{char}</span>;
        })}
      </div>
    </div>
  );
  return href ? <Link href={href}>{logoContent}</Link> : logoContent;
}
