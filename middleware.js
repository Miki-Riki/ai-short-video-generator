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

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = auth;
    const url = req.nextUrl;

    console.log("Middleware Invoked: ", { userId, url: url.pathname });

    // Protect dashboard routes
    if (isProtectedRoute(req)) await auth.protect();

    // If user is signed in, prevent access to `/sign-in` and redirect to `/dashboard`
    if (userId && url.pathname === "/sign-in") {
      console.log("Redirecting signed-in user from /sign-in to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is not signed in, prevent access to `/dashboard` and redirect to `/sign-in`
    if (!userId && url.pathname.startsWith("/dashboard")) {
      console.log("Redirecting unauthenticated user from /dashboard to /sign-in");
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error: ", error);
    return NextResponse.error();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

