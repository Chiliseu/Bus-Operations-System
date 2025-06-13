import { NextRequest, NextResponse } from 'next/server';

// --- Role and Page Access Definitions ---
export const ROLES = {
  ADMIN: 'admin',
  DISPATCHER: 'dispatcher',
  OPERATIONAL_MANAGER: 'operational_manager',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Map frontend routes to allowed roles
export const PAGE_ACCESS: Record<string, Role[]> = {
  '/bus-assignment': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
  '/route-management/Create-Route': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER],
  '/route-management/Create-Stop': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER],
  '/bus-operation/Pre-Dispatch': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
  '/bus-operation/Dispatch': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
  '/bus-operation/Post-Dispatch': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER, ROLES.DISPATCHER],
};

export const getAllowedRolesForPage = (pathname: string): Role[] | undefined => {
  // Direct match
  if (PAGE_ACCESS[pathname]) return PAGE_ACCESS[pathname];

  // Pattern match for dynamic routes (e.g., :id)
  const dynamicMatch = Object.entries(PAGE_ACCESS).find(([pattern]) => {
    if (!pattern.includes(':')) return false;
    const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
    return regex.test(pathname);
  });

  return dynamicMatch?.[1];
};

// --- JWT Extraction (from 'token' cookie) ---
function extractTokenFromCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;
  const match = cookie.match(/jwt=([^;]+)/);
  return match ? match[1] : null;
}

// --- Middleware ---
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get allowed roles for this page
  const allowedRoles = getAllowedRolesForPage(pathname);
  if (!allowedRoles) {
    console.log(`[middleware] Route "${pathname}" is public or not protected.`);
    return NextResponse.next();
  }

  const cookie = request.headers.get('cookie');
  const token = extractTokenFromCookie(cookie || '');

  if (!token) {
    console.warn(`[middleware] No token found in cookies for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  // Call your verify endpoint (should return { valid: true, user: { role: ... } })
  const verifyUrl = `${process.env.NEXT_PUBLIC_Backend_BaseURL}/api/VerifyToken`;
  console.log(`[middleware] Verifying token for "${pathname}" at ${verifyUrl}`);

  const res = await fetch(verifyUrl, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!res.ok) {
    console.warn(`[middleware] Verify endpoint responded with status ${res.status} for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  const data = await res.json();

  if (!data.valid) {
    console.warn(`[middleware] Token is invalid for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  if (!allowedRoles.includes(data.user?.role)) {
    console.warn(`[middleware] User role "${data.user?.role}" not allowed for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  console.log(`[middleware] Access granted for "${pathname}" to role "${data.user?.role}".`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/bus-assignment',
    '/route-management/:path*',
    '/bus-operation/:path*',
  ],
};