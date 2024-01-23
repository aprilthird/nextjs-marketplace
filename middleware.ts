import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(request: Request) {
    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/miqury") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);
