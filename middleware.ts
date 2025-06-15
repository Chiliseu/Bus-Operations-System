import { NextRequest, NextResponse } from 'next/server';

// --- Role and Page Access Definitions ---
export const ROLES = {
  ADMIN: 'admin',
  DISPATCHER: 'dispatcher',
  OPERATIONAL_MANAGER: 'Operations Manager',
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

function extractTokenFromCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;

  const jwtMatch = cookie.match(/(?:^|;\s*)jwt=([^;]+)/);
  const tokenMatch = cookie.match(/(?:^|;\s*)token=([^;]+)/);

  return jwtMatch?.[1] || tokenMatch?.[1] || null;
}

// --- Middleware ---
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[middleware] Incoming request for "${pathname}"`);

  // Get allowed roles for this page
  const allowedRoles = getAllowedRolesForPage(pathname);
  console.log(`[middleware] Allowed roles for "${pathname}":`, allowedRoles);

  if (!allowedRoles) {
    console.log(`[middleware] Route "${pathname}" is public or not protected.`);
    return NextResponse.next();
  }

  const cookie = request.headers.get('cookie');
  console.log('[middleware] Cookie header:', cookie);

  const token = extractTokenFromCookie(cookie || '');
  console.log('[middleware] Extracted token:', token);

  if (!token) {
    console.warn(`[middleware] No token found in cookies for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  // Call your verify endpoint (should return { valid: true, user: { role: ... } })
  const verifyUrl = `${process.env.NEXT_PUBLIC_Backend_BaseURL}/api/VerifyToken`;
  console.log(`[middleware] Verifying token for "${pathname}" at ${verifyUrl}`);

  let res;
  try {
    res = await fetch(verifyUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  } catch (err) {
    console.error(`[middleware] Error calling verify endpoint:`, err);
    return new NextResponse('Not found', { status: 404 });
  }

  if (!res.ok) {
    console.warn(`[middleware] Verify endpoint responded with status ${res.status} for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  let data;
  try {
    data = await res.json();
    console.log('[middleware] Verify endpoint response:', data);
  } catch (err) {
    console.error('[middleware] Error parsing verify endpoint response:', err);
    return new NextResponse('Not found', { status: 404 });
  }

  if (!data.valid) {
    console.warn(`[middleware] Token is invalid for "${pathname}".`);
    return new NextResponse('Not found', { status: 404 });
  }

  // if (!allowedRoles.includes(data.user?.role)) {
  //   console.warn(`[middleware] User role "${data.user?.role}" not allowed for "${pathname}".`);
  //   return new NextResponse('Not found', { status: 404 });
  // }

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