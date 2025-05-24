"use client";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { MENU_ITEMS } from "@/constants/menu-items.data";
import Link from "next/link";
import React from "react";

export default function BottomNavigation() {
  const { language } = useLanguage();
  return (
    <nav className="w-full h-16 flex items-center justify-around bg-blue-900 dark:bg-blue-700 text-white shrink-0">
      {/* Replace with your nav items */}
      {MENU_ITEMS.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="flex flex-col items-center justify-center"
        >
          <item.Icon size={25} />
          <span className="text-sm">{item.title[language]}</span>
        </Link>
      ))}
    </nav>
  );
}
