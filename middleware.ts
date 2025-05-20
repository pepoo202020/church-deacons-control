import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    /*
      Protect all routes except:
      - /
      - /login
      - /api/auth (NextAuth endpoints)
      - /assets (static assets)
    */
    "/((?!api/auth|login|assets|$).*)",
  ],
};
