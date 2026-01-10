# 🔐 Token Management System - Implementation Complete

## Overview

Your frontend now implements a secure, production-ready token management system based on your backend team's specifications.

### Token Strategy

1. **accessToken**: Stored in-memory (cleared on page refresh)
2. **refreshToken**: Stored as httpOnly cookie (set by backend)

### Security Benefits

✅ **No localStorage** - Prevents XSS attacks  
✅ **HttpOnly cookies** - JavaScript cannot access refreshToken  
✅ **In-memory storage** - accessToken cleared on page refresh  
✅ **Automatic refresh** - Seamless token rotation  
✅ **Request queuing** - Prevents refresh storms  

---

## 📁 Files Created

### Core Authentication

| File | Purpose |
|------|---------|
| `lib/auth/auth-store.ts` | In-memory state store with subscriber pattern |
| `lib/auth/bootstrap-auth.ts` | Rehydrates tokens on app startup |
| `lib/auth/use-auth.ts` | React hooks for auth state |
| `lib/api-fetch.ts` | Fetch wrapper with auto-refresh |
| `lib/auth-utils.ts` | Helper functions (logout, isAuthenticated) |

### API Routes

| File | Purpose |
|------|---------|
| `app/api/auth/refresh/route.ts` | Token refresh endpoint |
| `app/api/auth/logout/route.ts` | Logout endpoint |

### Updated Files

| File | Changes |
|------|---------|
| `app/Token_Generation.tsx` | Calls bootstrapAuth on app startup |
| `middleware.ts` | Checks for refreshToken cookie, redirects if missing |
| `lib/apiCalls/dashboard.ts` | Example using new apiFetch |

### Documentation

| File | Purpose |
|------|---------|
| `lib/USAGE_EXAMPLES.tsx` | 10 practical usage examples |
| `README_TOKEN_SYSTEM.md` | This file |

---

## 🚀 Quick Start Guide

### 1. For Your Team (Frontend)

**Make API calls using apiFetch:**

```typescript
import { apiFetch } from '@/lib/api-fetch';

// Automatically includes Authorization header and refreshes on 401
const response = await apiFetch('/api/users', {
  method: 'GET',
});

const data = await response.json();
```

**Or use helper functions:**

```typescript
import { apiGet, apiPost } from '@/lib/api-fetch';

const users = await apiGet('/api/users');
const newUser = await apiPost('/api/users', { name: 'John' });
```

**Use auth hooks in React components:**

```tsx
import { useAuth, useIsAuthenticated } from '@/lib/auth/use-auth';
import { logout } from '@/lib/auth-utils';

function MyComponent() {
  const { accessToken } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Logged in!</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

### 2. For Your Backend Team

**Required endpoints:**

1. **POST /api/auth/refresh**
   - Reads `refreshToken` from httpOnly cookie
   - Returns: `{ "accessToken": "..." }`
   - Optionally rotates refreshToken cookie

2. **POST /api/auth/logout**
   - Clears refreshToken cookie
   - Returns: `{ "message": "Logged out" }`

**Cookie configuration:**

```javascript
// After successful login
res.cookie('refreshToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  domain: process.env.COOKIE_DOMAIN, // e.g., ".agilabuscorp.me"
});
```

**Important:** If your backend uses a different cookie name than `refreshToken`, update it in `middleware.ts`:

```typescript
const REFRESH_TOKEN_COOKIE_NAME = 'yourCookieName'; // Line 5
```

---

## 🔄 Authentication Flow

### 1. Initial App Load

```
App starts
    ↓
Token_Generation component runs
    ↓
Calls bootstrapAuth()
    ↓
Fetches /api/auth/refresh (includes refreshToken cookie)
    ↓
Backend returns { accessToken }
    ↓
Stores accessToken in memory (authStore)
    ↓
App ready for API calls
```

### 2. Making API Calls

```
Component calls apiFetch('/api/users')
    ↓
Adds Authorization: Bearer {accessToken}
    ↓
Includes credentials (refreshToken cookie)
    ↓
Response 200? → Return data
    ↓
Response 401? → Token expired
    ↓
Call /api/auth/refresh
    ↓
Get new accessToken
    ↓
Retry original request
    ↓
Return data
```

### 3. Middleware Protection

```
User navigates to protected route
    ↓
Middleware checks for refreshToken cookie
    ↓
Cookie exists? → Allow access
    ↓
Cookie missing? → Redirect to auth.agilbuscorp.me
```

### 4. Logout

```
User clicks logout
    ↓
Call /api/auth/logout
    ↓
Backend clears refreshToken cookie
    ↓
Frontend clears accessToken from memory
    ↓
Redirect to auth.agilbuscorp.me
```

---

## 📝 Migrating Existing API Calls

### Before (Old Way)

```typescript
const response = await fetch('/api/users', {
  method: 'GET',
  credentials: 'include',
});
```

### After (New Way)

```typescript
import { apiFetch } from '@/lib/api-fetch';

const response = await apiFetch('/api/users', {
  method: 'GET',
});
```

**Benefits of migration:**
- ✅ Automatic Authorization header
- ✅ Automatic token refresh on 401
- ✅ Request queuing (prevents refresh storms)
- ✅ Error handling and redirect on auth failure

---

## 🔧 Configuration

### Environment Variables

Required in your `.env.local`:

```env
NEXT_PUBLIC_Backend_BaseURL=https://api.agilabuscorp.me
NODE_ENV=production
COOKIE_DOMAIN=.agilabuscorp.me  # Optional: for cross-subdomain cookies
```

### Protected Routes

Configure in `middleware.ts`:

```typescript
export const config = {
  matcher: [
    '/bus-assignment',
    '/dashboard',
    '/route-management/:path*',
    '/bus-operation/:path*',
    // Add more protected routes here
  ],
};
```

### Role-Based Access

Update `PAGE_ACCESS` in `middleware.ts`:

```typescript
export const PAGE_ACCESS: Record<string, Role[]> = {
  '/dashboard': [ROLES.ADMIN, ROLES.OPERATIONAL_MANAGER],
  '/bus-assignment': [ROLES.ADMIN, ROLES.DISPATCHER],
  // Add more role restrictions
};
```

---

## 🛡️ Security Checklist

- ✅ accessToken NEVER stored in localStorage/sessionStorage
- ✅ refreshToken is httpOnly (JavaScript cannot access)
- ✅ Credentials included in all API calls
- ✅ Automatic redirect on auth failure
- ✅ Middleware protects routes
- ✅ Request queuing prevents refresh storms
- ✅ HTTPS enforced in production

---

## 🧪 Testing the System

### 1. Test Bootstrap (App Load)

```bash
# Open browser console
# You should see:
[Token_Generation] Authentication initialized successfully
```

### 2. Test API Calls

```typescript
import { apiGet } from '@/lib/api-fetch';

// Should work with automatic token refresh
const data = await apiGet('/api/dashboard');
console.log(data);
```

### 3. Test Token Expiration

```typescript
// Manually expire token in browser console
import { authStore } from '@/lib/auth/auth-store';
authStore.setAccessToken('invalid_token');

// Make API call - should auto-refresh
import { apiGet } from '@/lib/api-fetch';
await apiGet('/api/users'); // Should succeed after auto-refresh
```

### 4. Test Middleware

```bash
# Clear cookies in browser
# Navigate to protected route: /bus-assignment
# Should redirect to: https://auth.agilbuscorp.me
```

### 5. Test Logout

```typescript
import { logout } from '@/lib/auth-utils';
await logout(); // Should redirect to auth page
```

---

## 🐛 Troubleshooting

### "No refreshToken found" in middleware

**Cause:** User has no refresh token cookie  
**Solution:** User needs to login at auth.agilbuscorp.me

### "Token refresh failed" errors

**Causes:**
- Backend refresh endpoint not implemented
- refreshToken cookie expired
- Backend not reading cookie correctly

**Solution:** Check backend logs and verify cookie configuration

### API calls return 401 repeatedly

**Causes:**
- Backend not accepting Authorization header
- accessToken format incorrect
- CORS issues

**Solution:** Verify backend accepts `Bearer {token}` format

### Middleware redirects even with valid cookie

**Cause:** Cookie name mismatch  
**Solution:** Update `REFRESH_TOKEN_COOKIE_NAME` in `middleware.ts`

---

## 📚 Additional Resources

- **Usage Examples**: See `lib/USAGE_EXAMPLES.tsx`
- **Auth Store**: See `lib/auth/auth-store.ts`
- **API Wrapper**: See `lib/api-fetch.ts`
- **Middleware**: See `middleware.ts`

---

## ✅ Rules to Follow

### ❌ DO NOT

- Store tokens in localStorage
- Store tokens in sessionStorage
- Access refreshToken from JavaScript
- Share tokens between systems

### ✅ DO

- Use `apiFetch` for all API calls
- Use `useAuth` hook in React components
- Let the system handle token refresh
- Include credentials in all requests
- Follow the examples in `USAGE_EXAMPLES.tsx`

---

## 🎯 Next Steps

1. ✅ **Frontend Complete** - Token system implemented
2. ⏳ **Coordinate with Backend** - Verify endpoints
3. ⏳ **Update API Calls** - Migrate to `apiFetch`
4. ⏳ **Test Flow** - End-to-end testing
5. ⏳ **Deploy** - Production deployment

---

## 💡 Mental Model

Think of it this way:

- **refreshToken** = Your house key (stays in your pocket, never shown)
- **accessToken** = Temporary visitor badge (shown to guards, expires)
- **apiFetch** = Automatic badge renewal (gets new badge if expired)
- **middleware** = Gate guard (checks if you have house key)

---

## 📞 Support

If you encounter issues:

1. Check `lib/USAGE_EXAMPLES.tsx` for examples
2. Review this README
3. Check browser console for error messages
4. Verify backend endpoints are working
5. Test with curl to isolate frontend/backend issues

---

**Implementation Status: ✅ COMPLETE**

Your frontend is now ready to accept and manage tokens according to your backend team's specifications!
