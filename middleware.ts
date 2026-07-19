import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_token')?.value;

  // 1. Prevent logged-in users from seeing the login page
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 2. Protect the admin and internal dashboards
  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    if (!token) {
      // If the user isn't logged in, instantly redirect them to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Add future security rules here (e.g., blocking bad IPs, checking roles)

  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, icon.png (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt).*)',
  ],
};
