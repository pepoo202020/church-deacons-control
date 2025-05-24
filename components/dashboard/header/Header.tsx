"use client";
import Logo from "../../shared/Logo";
import { useLanguage } from "../../providers/LanguageProvider";
import { useSession } from "next-auth/react";
import { MainRole } from "./MainRole";
import { Loading } from "@/components/shared/Loading";
import { RolesSelector } from "./rolesSelector";
import { Profile } from "./Profile";

export default function DashboardHeader() {
  const { language } = useLanguage();
  const { data: session } = useSession();

  const roles = session?.user ? session.user.roles : [];

  if (!session?.user) {
    return <Loading language={language} />;
  }

  return (
    <header className="w-full h-20 flex items-center justify-between px-6 bg-blue-900 dark:bg-blue-700 text-white shrink-0">
      {/* Logo */}
      <Logo size="SM" header lang={language} href="/dashboard" />
      {roles.length > 0 && <MainRole role={roles[0]} language={language} />}
      <div className="flex items-center gap-2">
        <RolesSelector roles={roles} />
        <Profile
          image={session.user.image}
          name={session.user.name}
          email={session.user.email}
          language={language}
        />
      </div>
    </header>
  );
}
