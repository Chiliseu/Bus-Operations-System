/**
 * Logout API Route
 * 
 * Clears the refreshToken httpOnly cookie and logs out the user.
 * 
 * Flow:
 * 1. Call backend logout endpoint (optional)
 * 2. Clear refreshToken cookie
 * 3. Return success response
 * 
 * The client should:
 * - Clear in-memory accessToken (authStore.clear())
 * - Redirect to auth page
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_Backend_BaseURL;

export async function POST() {
  try {
    // Optional: Call backend logout endpoint
    if (BACKEND_URL) {
      try {
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('[logout] Backend logout error:', error);
        // Continue with cookie deletion even if backend call fails
      }
    }

    // Clear refreshToken cookie
    const cookieStore = await cookies();
    cookieStore.delete('refreshToken');
    
    console.log('[logout] User logged out, refreshToken cookie cleared');

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[logout] Error during logout:', error);
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
  }
}
