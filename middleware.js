/* import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; */

import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export function middleware(req) {
  const { userId } = getAuth(req); // Get user session from Clerk
  const url = req.nextUrl;

  // If user is signed in, prevent access to `/sign-in` and redirect to `/dashboard`
  if (userId && url.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not signed in, prevent access to `/dashboard` and redirect to `/sign-in`
  if (!userId && url.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Apply middleware to relevant pages
export const config = {
  matcher: ["/sign-in", "/dashboard"], // Apply only to these routes
};

