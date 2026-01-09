import { NextRequest, NextResponse } from 'next/server';
import { LOGIN_URL } from '@/lib/urls';

// --- Role and Page Access Definitions ---
export const ROLES = {
  ADMIN: 'admin',
  DISPATCHER: 'dispatcher',
  OPERATIONAL_MANAGER: 'Operations Manager',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

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

function extractTokenFromCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;
  const jwtMatch = cookie.match(/(?:^|;\s*)jwt=([^;]+)/);
  const tokenMatch = cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return jwtMatch?.[1] || tokenMatch?.[1] || null;
}

// --- Middleware ---
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = 'https://auth.agilabuscorp.me/authentication/login';
  
  console.log(`[middleware] Incoming request for "${pathname}"`);

  const allowedRoles = getAllowedRolesForPage(pathname);
  if (!allowedRoles) {
    console.log(`[middleware] Route "${pathname}" is public or not protected.`);
    return NextResponse.next();
  }

  const cookie = request.headers.get('cookie');
  const token = extractTokenFromCookie(cookie || '');
  if (!token) {
    console.warn(`[middleware] No token found. Redirecting to login.`);
    //return NextResponse.redirect(loginUrl);
    return new NextResponse('[middleware] No token found. Redirecting to login.', { status: 404 });
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_Backend_BaseURL}/api/VerifyToken`;
  let res;
  try {
    res = await fetch(verifyUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  } catch (err) {
    console.error(`[middleware] Error calling verify endpoint:`, err);
    return NextResponse.redirect(loginUrl);
    //return new NextResponse('[middleware] Error calling verify endpoint:', { status: 404 });
  }

  if (!res.ok) {
    console.warn(`[middleware] Verify endpoint error. Redirecting to login.`);
    return NextResponse.redirect(loginUrl);
    //return new NextResponse('[middleware] Verify endpoint error. Redirecting to login.', { status: 404 });
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error(`[middleware] Error parsing verify response. Redirecting to login.`);
    return NextResponse.redirect(loginUrl);
    //return new NextResponse('[middleware] Error parsing verify response. Redirecting to login.', { status: 404 });
  }

  if (!data.valid) {
    console.warn(`[middleware] Invalid token. Redirecting to login.`);
    return NextResponse.redirect(loginUrl);
    //return new NextResponse('[middleware] Invalid token. Redirecting to login.', { status: 404 });
  }

  // const userRole = data.user?.role;
  // if (!allowedRoles.includes(userRole)) {
  //   console.warn(`[middleware] Role "${userRole}" not allowed for "${pathname}". Redirecting to login.`);
  //   return NextResponse.redirect(loginUrl);
  //   //return new NextResponse('[middleware] Role not Allowed', { status: 404 });
  // }

  // console.log(`[middleware] Access granted to "${pathname}" for role "${userRole}".`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/bus-assignment',
    //'/dashboard',
    '/route-management/:path*',
    //'/bus-operation/:path*',
  ],
};
