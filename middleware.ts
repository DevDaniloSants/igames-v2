import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

const isProtectedRoute = (auth: Session | null, path: string) => {
  if (path.startsWith("/admin") && auth?.user.role !== "ADMIN") {
    return { shouldRedirect: true, path: "/" };
  }

  if (path.startsWith("/user") && !auth) {
    return { shouldRedirect: true, path: "/" };
  }

  return { shouldRedirect: false, path: "/" };
};

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isAuth = req.auth;

  const { shouldRedirect, path: redirectPath } = isProtectedRoute(isAuth, path);

  if (shouldRedirect) {
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
