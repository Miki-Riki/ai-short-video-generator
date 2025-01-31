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

export function middleware(req) {
  const res = NextResponse.next();

  // Disable caching for authentication-related pages
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  return res;
}

// Apply middleware to these routes
export const config = {
  matcher: ["/sign-in", "/dashboard"],
};
