import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/api/payment',
  '/payment(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);
  // Exclude the auth callback route from middleware processing
  if (url.pathname.startsWith('/auth/callback')) {
    return NextResponse.next();
  }
  
  if (isProtectedRoute(req)) {
    const { sessionId } = await auth();
    if (!sessionId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  
  return NextResponse.next();
});
  
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
