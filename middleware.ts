import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Protected paths that require authentication
  const protectedPaths = ["/profile", "/admin"];

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(`${protectedPath}/`)
  );

  // If it's not a protected path, don't check for token
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Get the token with more detailed options
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // For debugging
  console.log("Middleware checking path:", path);
  console.log("Token exists:", !!token);

  // Check if the token exists
  if (!token) {
    // Redirect to login page if no token
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
