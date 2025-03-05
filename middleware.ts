import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

const privateRoutes = [
  { path: "/admin", whenAuthenticated: "next", role: "ADMIN" },
  { path: "/user", whenAuthenticated: "next", role: "USER" },
] as const;

export default auth((req) => {
  const path = req.nextUrl.pathname;

  const isAuth = req.auth;
  const isPrivateRoute = privateRoutes.find((route) => route.path === path);

  if (isPrivateRoute?.path === "/admin" && isAuth?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPrivateRoute?.path === "/user" && !isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
