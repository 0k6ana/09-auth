import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivateRoute =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  let token = accessToken;

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();
      const session = response.data;

      token = session.accessToken;

      const res = NextResponse.next();

      res.cookies.set("accessToken", session.accessToken);
      res.cookies.set("refreshToken", session.refreshToken);

      return res;
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}