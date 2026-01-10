# 🚀 Quick Reference Card

## For Developers

### Making API Calls

```typescript
import { apiFetch, apiGet, apiPost } from '@/lib/api-fetch';

// GET request
const users = await apiGet('/api/users');

// POST request
const newUser = await apiPost('/api/users', { name: 'John' });

// Full control
const response = await apiFetch('/api/users', {
  method: 'POST',
  headers: { 'Custom-Header': 'value' },
  body: JSON.stringify(data),
});
```

### React Hooks

```typescript
import { useAuth, useIsAuthenticated } from '@/lib/auth/use-auth';

function MyComponent() {
  const { accessToken } = useAuth();
  const isAuthenticated = useIsAuthenticated();
  
  // Use in your component
}
```

### Logout

```typescript
import { logout } from '@/lib/auth-utils';

await logout(); // Clears tokens and redirects
```

### Check Authentication

```typescript
import { isAuthenticated, getAccessToken } from '@/lib/auth-utils';

if (isAuthenticated()) {
  const token = getAccessToken();
  // Do something
}
```

---

## File Locations

| What | Where |
|------|-------|
| Auth store | `lib/auth/auth-store.ts` |
| API wrapper | `lib/api-fetch.ts` |
| React hooks | `lib/auth/use-auth.ts` |
| Utilities | `lib/auth-utils.ts` |
| Bootstrap | `lib/auth/bootstrap-auth.ts` |
| Middleware | `middleware.ts` |
| Examples | `lib/USAGE_EXAMPLES.tsx` |
| Full docs | `README_TOKEN_SYSTEM.md` |

---

## Configuration

### Update cookie name (if needed)

**File:** `middleware.ts` (line 5)
```typescript
const REFRESH_TOKEN_COOKIE_NAME = 'yourCookieName';
```

### Add protected routes

**File:** `middleware.ts` (bottom)
```typescript
export const config = {
  matcher: [
    '/bus-assignment',
    '/your-new-route',
  ],
};
```

### Environment variables

```env
NEXT_PUBLIC_Backend_BaseURL=https://api.agilabuscorp.me
NODE_ENV=production
COOKIE_DOMAIN=.agilabuscorp.me
```

---

## Token Flow (Simple)

```
1. App loads → bootstrapAuth() runs
2. Gets accessToken from refresh endpoint
3. Stores in memory
4. API calls use accessToken automatically
5. On 401 → auto-refresh → retry
6. On logout → clear → redirect
```

---

## Rules

### ✅ DO
- Use `apiFetch` for all API calls
- Use `useAuth` in React components
- Call `logout()` for logout
- Let system handle refreshes

### ❌ DON'T
- Store tokens in localStorage
- Store tokens in sessionStorage
- Access refreshToken from JS
- Call `/api/auth/refresh` manually

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No token on load | Check `/api/auth/refresh` endpoint |
| 401 errors | Check backend Authorization header |
| Middleware redirects | Check cookie name matches |
| CORS errors | Backend needs `credentials: true` |

---

## Next Steps

1. Update your API calls to use `apiFetch`
2. Test the login → API call → logout flow
3. Verify token refresh works on 401
4. Deploy and test in production

---

**For detailed docs:** See `README_TOKEN_SYSTEM.md`  
**For examples:** See `lib/USAGE_EXAMPLES.tsx`  
**For backend:** See `BACKEND_INTEGRATION_CHECKLIST.md`
