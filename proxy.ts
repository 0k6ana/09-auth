import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");

  const isPrivateRoute = request.nextUrl.pathname.startsWith("/profile")
    || request.nextUrl.pathname.startsWith("/notes");

  const isAuthRoute = request.nextUrl.pathname.startsWith("/sign-in")
    || request.nextUrl.pathname.startsWith("/sign-up");

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}