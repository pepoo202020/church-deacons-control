import { useSession } from "next-auth/react";

// Check if the user is authenticated using NextAuth
export const useAuthStatus = (): boolean => {
  const { data: session, status } = useSession();
  return status === "authenticated" && !!session?.user;
};
