/**
 * Usage Examples for Token Management System
 * 
 * This file demonstrates how to use the authentication system
 * in your components and API calls.
 */

// ============================================
// EXAMPLE 1: Using apiFetch for API calls
// ============================================

import { apiFetch, apiGet, apiPost } from '@/lib/api-fetch';
import { useAuth, useIsAuthenticated } from '@/lib/auth/use-auth';
import { logout } from '@/lib/auth-utils';
import { authStore } from '@/lib/auth/auth-store';
import { useEffect, useState } from 'react';

// Basic fetch with auto-refresh
async function fetchUsers() {
  const response = await apiFetch('/api/users', {
    method: 'GET',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
}

// Using helper functions
async function getUsersSimple() {
  return apiGet('/api/users');
}

async function createUser(userData: any) {
  return apiPost('/api/users', userData);
}

// ============================================
// EXAMPLE 2: Using useAuth hook in React components
// ============================================

'use client';

// import { useAuth, useIsAuthenticated } from '@/lib/auth/use-auth'; // Already imported at top
// import { logout } from '@/lib/auth-utils'; // Already imported at top

function ProfileComponent() {
  const { accessToken } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  const handleLogout = async () => {
    await logout(); // Clears token and redirects
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Token: {accessToken?.slice(0, 20)}...</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Protected page component
// ============================================

'use client';

// import { useEffect, useState } from 'react';
// import { useIsAuthenticated } from '@/lib/auth/use-auth'; // Already imported at top
// import { apiGet } from '@/lib/api-fetch'; // Already imported at top

function DashboardPage() {
  const isAuthenticated = useIsAuthenticated();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch data with auto-refresh
      apiGet('/api/dashboard')
        .then(setData)
        .catch(console.error);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

// ============================================
// EXAMPLE 4: Manual token access
// ============================================

// import { authStore } from '@/lib/auth/auth-store';

function manualTokenUsage() {
  // Get current token
  const { accessToken } = authStore.get();
  
  // Subscribe to changes
  const unsubscribe = authStore.subscribe(() => {
    console.log('Token changed:', authStore.get().accessToken);
  });
  
  // Clean up subscription
  // unsubscribe();
}

// ============================================
// EXAMPLE 5: Server-side API route
// ============================================

// app/api/users/route.ts
// import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: any) {
  // The accessToken is NOT available in server-side routes
  // Use the refreshToken cookie to validate on backend
  
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  if (!refreshToken) {
    return { error: 'Unauthorized', status: 401 }; // Return plain object for example
  }
  
  // Your logic here...
  return { users: [] }; // Return plain object for example
}

// ============================================
// EXAMPLE 6: Updating existing API calls
// ============================================

// BEFORE (old way)
async function fetchDashboardOld() {
  const response = await fetch('/api/dashboard', {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
}

// AFTER (new way with auto-refresh)
// import { apiFetch } from '@/lib/api-fetch'; // Already imported at top

async function fetchDashboardNew() {
  const response = await apiFetch('/api/dashboard', {
    method: 'GET',
  });
  return response.json();
}

// Or even simpler:
// import { apiGet } from '@/lib/api-fetch'; // Already imported at top

async function fetchDashboardSimple() {
  return apiGet('/api/dashboard');
}

// ============================================
// EXAMPLE 7: Logout button component
// ============================================

'use client';

// import { logout } from '@/lib/auth-utils'; // Already imported at top

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout();
      // User will be redirected to auth.agilbuscorp.me
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
}

// ============================================
// EXAMPLE 8: Conditional rendering based on auth
// ============================================

'use client';

// import { useIsAuthenticated } from '@/lib/auth/use-auth'; // Already imported at top

export function ConditionalComponent() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome back!</div>
      ) : (
        <div>Please login</div>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 9: Error handling with auto-refresh
// ============================================

// import { apiFetch } from '@/lib/api-fetch'; // Already imported at top

async function fetchDataWithErrorHandling() {
  try {
    const response = await apiFetch('/api/data', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // If refresh fails, user is redirected automatically
    console.error('API call failed:', error);
    throw error;
  }
}

// ============================================
// EXAMPLE 10: Form submission with auth
// ============================================

'use client';

// import { useState } from 'react';
// import { apiPost } from '@/lib/api-fetch'; // Already imported at top

export function CreateUserForm() {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await apiPost('/api/users', { name });
      console.log('User created:', result);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  );
}
