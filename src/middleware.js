import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(
    new URL("/dashboard?type=recent", request.url)
  );
}

export const config = {
  matcher: ["/"],
};
