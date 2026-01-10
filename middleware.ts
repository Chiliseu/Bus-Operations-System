import { NextRequest, NextResponse } from 'next/server';

// --- Auth Configuration ---
const AUTH_LOGIN_URL = 'https://auth.agilabuscorp.me/authentication/login';
const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

// --- Role and Page Access Definitions ---
export const ROLES = {
  ADMIN: 'admin',
  DISPATCHER: 'dispatcher',
  OPERATIONAL_MANAGER: 'Operations Manager',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Define which roles can access specific routes (optional - for fine-grained control)
// If a route is not listed here, all authenticated users can access it
export const PAGE_ACCESS: Record<string, Role[]> = {
  //'/dashboard': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER],
  '/bus-assignment': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
  '/route-management/Create-Route': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER],
  '/route-management/Create-Stop': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER],
  '/bus-operation/Pre-Dispatch': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
  '/bus-operation/Dispatch': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
  '/bus-operation/Post-Dispatch': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
};

export const getAllowedRolesForPage = (pathname: string): Role[] | undefined => {
  if (PAGE_ACCESS[pathname]) return PAGE_ACCESS[pathname];

  const dynamicMatch = Object.entries(PAGE_ACCESS).find(([pattern]) => {
    if (!pattern.includes(':')) return false;
    const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
    return regex.test(pathname);
  });

  return dynamicMatch?.[1];
};

/**
 * Extract refreshToken from cookies.
 * The refreshToken should be an httpOnly cookie set by the backend.
 */
function extractRefreshTokenFromCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;
  
  const refreshTokenMatch = cookie.match(
    new RegExp(`(?:^|;\\s*)${REFRESH_TOKEN_COOKIE_NAME}=([^;]+)`)
  );
  
  return refreshTokenMatch?.[1] || null;
}

// --- Middleware ---
/**
 * Middleware for route protection.
 * 
 * Security Model:
 * - ALL routes matched by config.matcher require authentication
 * - Checks for refreshToken httpOnly cookie
 * - Does NOT validate the token (delegated to API routes)
 * - Redirects to auth page if no refreshToken found
 * 
 * Flow:
 * 1. If route matches config.matcher, it requires authentication
 * 2. Check for refreshToken cookie
 * 3. If no cookie, redirect to auth.agilbuscorp.me
 * 4. If cookie exists, allow request (token validation happens in API calls)
 * 
 * Note: PAGE_ACCESS is optional for role-based restrictions (future use)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`[middleware] Incoming request for "${pathname}"`);

  // Since this middleware only runs on matched routes (see config.matcher below),
  // ALL requests here require authentication
  
  // Check for refreshToken in cookies
  const cookie = request.headers.get('cookie');
  const refreshToken = extractRefreshTokenFromCookie(cookie || '');
  
  if (!refreshToken) {
    console.warn(`[middleware] No refreshToken found for "${pathname}". Redirecting to auth login.`);
    return NextResponse.redirect(AUTH_LOGIN_URL);
  }

  // RefreshToken exists - allow access
  // Token validation will happen in API calls via apiFetch wrapper
  console.log(`[middleware] RefreshToken found. Access granted to "${pathname}".`);
  
  // Optional: Check role-based access (future implementation)
  // const allowedRoles = getAllowedRolesForPage(pathname);
  // if (allowedRoles) {
  //   // Validate user role here
  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Dashboard routes
    '/dashboard/:path*',
    '/bus-assignment/:path*',
    '/bus-rental/:path*',
    '/maintenance/:path*',
    '/performance-report/:path*',
    '/qouta-assignment/:path*',
    '/route-management/:path*',
    '/bus-operation/:path*',
  ],
};
