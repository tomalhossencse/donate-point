import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request) {
  // 1. Get the session token from the incoming request cookies
  const sessionToken = request.cookies.get("session_token");

  // 2. Check if the token exists
  if (!sessionToken) {
    // If NO token is found, the user is NOT authenticated.
    // Redirect them to the login page (root path "/")
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. If a token IS found, the user is likely authenticated.
  // Allow the request to proceed to the intended route handler or page.
  // This is the missing return statement in your original code.
  return NextResponse.next();
}

export const config = {
  // This middleware will run for any path starting with /be-a-doner/
  matcher: "/be-a-doner/:path*",
};
