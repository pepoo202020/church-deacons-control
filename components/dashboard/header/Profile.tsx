"use client";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageType } from "@/types/types";
import { LogOut, Moon, Settings, Sun, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { MdLanguage } from "react-icons/md";
import { Loading } from "@/components/shared/Loading";

export const Profile = ({
  image,
  name,
  email,
  language,
}: {
  image: string;
  name: string;
  email: string;
  language: LanguageType;
}) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();
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

  if (loading) return <Loading language={language} />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border-white border"
        >
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
            <AvatarImage src={image} alt={`Image of ${name}`} />
            <AvatarFallback className="bg-white text-blue-900">
              {name?.charAt(0).toUpperCase() || (
                <UserRound className="w-8 h-8 sm:w-10 sm:h-10" />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2 sm:mx-5 min-w-[10rem] sm:min-w-xs">
        <DropdownMenuLabel className="text-gray-500 text-center px-5">
          {name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-gray-500 text-center -mt-3 cursor-pointer hover:underline px-5">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer px-5"
          dir={language === "AR" ? "rtl" : "ltr"}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>{language === "AR" ? "الإعدادات" : "Settings"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer px-5"
          dir={language === "AR" ? "rtl" : "ltr"}
          onClick={() => setTheme("light")}
        >
          <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
          {language === "AR" ? "الوضع النهاري" : "Light Mode"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer px-5"
          dir={language === "AR" ? "rtl" : "ltr"}
          onClick={() => setTheme("dark")}
        >
          <Moon className=" mr-2 h-4 w-4 rotate-90 scale-100 transition-all dark:rotate-0 dark:scale-100" />
          {language === "AR" ? "الوضع المظلم" : "Dark Mode"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer px-5"
          dir={language === "AR" ? "rtl" : "ltr"}
          onClick={() => setTheme("system")}
        >
          <span className=" mr-2 h-4 w-4 rotate-90 scale-100 transition-all dark:rotate-0 dark:scale-100" />
          {language === "AR" ? "الوضع النظامي" : "System Mode"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer px-5"
          dir={language === "AR" ? "rtl" : "ltr"}
          onClick={() => setLanguage("AR")}
        >
          <MdLanguage className="mr-2 h-4 w-4" />
          {language === "AR" ? "العربية" : "Arabic"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer px-5"
          dir={language === "AR" ? "rtl" : "ltr"}
          onClick={() => setLanguage("EN")}
        >
          <MdLanguage className="mr-2 h-4 w-4" />
          {language === "AR" ? "الإنجليزية" : "English"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500 px-5"
          onClick={handleLogout}
          dir={language === "AR" ? "rtl" : "ltr"}
        >
          <LogOut className="text-red-500 focus:text-red-500 mr-2 h-4 w-4" />
          {language === "AR" ? "تسجيل خروج" : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
