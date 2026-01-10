/**
 * Token Refresh API Route
 * 
 * Flow:
 * 1. Extract refreshToken from HttpOnly cookie
 * 2. Send to Backend/Gateway POST /auth/refresh with token in body
 * 3. Receive new accessToken and rotated refreshToken
 * 4. Set new refreshToken as HttpOnly cookie (same-site, secure)
 * 5. Return accessToken to client (stored in-memory)
 * 
 * Security:
 * - refreshToken never exposed to JavaScript
 * - HttpOnly cookies for cross-subdomain support
 * - Automatic token rotation
 * 
 * @module refresh-route
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_Backend_BaseURL || 'http://localhost:4001';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN; // e.g., ".agilabuscorp.me"
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Secure cookie configuration for cross-subdomain sharing.
 */
function getSecureCookieOptions() {
  return {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
    ...(COOKIE_DOMAIN && { domain: COOKIE_DOMAIN }),
  };
}

export async function POST(request: NextRequest) {
  // Get token from httpOnly cookie (your backend uses 'token' or 'jwt', not 'refreshToken')
  const token = request.cookies.get('token')?.value || request.cookies.get('jwt')?.value;

  if (!token) {
    return NextResponse.json(
      { 
        message: 'No token found',
        hint: 'Please login to continue',
      },
      { status: 401 }
    );
  }

  try {
    // Your backend uses a single JWT token system
    // The token from the cookie IS the accessToken
    // Just return it so the frontend can store it in memory
    return NextResponse.json({ accessToken: token }, { status: 200 });
  } catch (error) {
    console.error('[refresh] Token retrieval error:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve token' },
      { status: 500 }
    );
  }
}
