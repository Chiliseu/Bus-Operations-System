# Backend Integration Checklist

## 🎯 What Your Backend Team Needs to Implement

### 1. POST /api/auth/refresh

**Purpose:** Rotate tokens and provide new accessToken

**Request:**
```http
POST /api/auth/refresh
Content-Type: application/json
Cookie: refreshToken=<httpOnly_cookie_value>

Body:
{
  "refreshToken": "<token_from_cookie>"
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "new_rotated_refresh_token_optional"
}
```

**Set-Cookie Header (if rotating):**
```http
Set-Cookie: refreshToken=<new_token>; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/; Domain=.agilabuscorp.me
```

**Error Response (401):**
```json
{
  "message": "Invalid or expired refresh token"
}
```

---

### 2. POST /api/auth/logout

**Purpose:** Clear refresh token and logout user

**Request:**
```http
POST /api/auth/logout
Cookie: refreshToken=<httpOnly_cookie_value>
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Set-Cookie Header:**
```http
Set-Cookie: refreshToken=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/; Domain=.agilabuscorp.me
```

---

### 3. Login Endpoint (Existing)

**Modifications needed:**

After successful login, set refreshToken cookie:

```javascript
// Example (Node.js/Express)
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  domain: process.env.COOKIE_DOMAIN || undefined,
});

res.json({
  accessToken: accessToken,
  user: { id, email, role },
});
```

---

## 🔧 Configuration Requirements

### Cookie Settings

```javascript
{
  httpOnly: true,              // ✅ REQUIRED: Prevents JS access
  secure: true,                // ✅ REQUIRED in production (HTTPS only)
  sameSite: 'lax',            // ✅ REQUIRED: CSRF protection
  maxAge: 604800000,          // 7 days in milliseconds
  path: '/',                   // ✅ REQUIRED: Available to all routes
  domain: '.agilabuscorp.me'  // Optional: Cross-subdomain support
}
```

### Environment Variables

```env
COOKIE_DOMAIN=.agilabuscorp.me  # For cross-subdomain cookies
NODE_ENV=production             # Enables secure flag
```

---

## 🧪 Testing Endpoints

### Test Refresh Endpoint

```bash
# 1. Get refresh token from login
curl -X POST https://api.agilabuscorp.me/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  -c cookies.txt

# 2. Test refresh
curl -X POST https://api.agilabuscorp.me/api/auth/refresh \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"refreshToken":"<token_from_cookie>"}'

# Expected: 200 OK with new accessToken
```

### Test Logout Endpoint

```bash
curl -X POST https://api.agilabuscorp.me/api/auth/logout \
  -b cookies.txt

# Expected: 200 OK and cookie cleared
```

---

## 📋 Integration Checklist

### Phase 1: Basic Setup

- [ ] POST /api/auth/refresh endpoint created
- [ ] POST /api/auth/logout endpoint created
- [ ] Login endpoint sets refreshToken cookie
- [ ] Cookie configuration matches requirements
- [ ] CORS configured for credentials

### Phase 2: Testing

- [ ] Test refresh endpoint with valid token
- [ ] Test refresh endpoint with expired token
- [ ] Test refresh endpoint with invalid token
- [ ] Test logout endpoint
- [ ] Test cookie rotation (if implemented)
- [ ] Test cross-subdomain cookies (if needed)

### Phase 3: Security

- [ ] httpOnly flag enabled
- [ ] secure flag enabled in production
- [ ] sameSite set to 'lax' or 'strict'
- [ ] HTTPS enforced in production
- [ ] Token expiration configured correctly

### Phase 4: Error Handling

- [ ] 401 returned for invalid/expired tokens
- [ ] Proper error messages in responses
- [ ] Cookie cleared on logout
- [ ] Cookie cleared on auth failure

---

## 🔒 Security Requirements

### Token Specifications

**accessToken:**
- Lifetime: 15 minutes (recommended)
- Format: JWT
- Payload: `{ userId, email, role, exp }`
- Signed with secret key

**refreshToken:**
- Lifetime: 7 days (recommended)
- Format: Random string or JWT
- Stored in database (optional for revocation)
- HttpOnly cookie only

### CORS Configuration

```javascript
// Example (Express)
app.use(cors({
  origin: [
    'https://dms.agilabuscorp.me',
    'https://ems.agilabuscorp.me',
  ],
  credentials: true,  // ✅ REQUIRED for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## 🔄 Token Rotation (Optional but Recommended)

If implementing token rotation:

1. Generate new refreshToken on each refresh
2. Update cookie with new refreshToken
3. Invalidate old refreshToken in database
4. Return new accessToken in response

**Benefits:**
- Improved security
- Automatic revocation of old tokens
- Prevents token reuse attacks

---

## 📊 Expected API Behavior

### Successful Refresh

```
Frontend                    Backend
    |                          |
    | POST /api/auth/refresh   |
    | Cookie: refreshToken=... |
    |------------------------->|
    |                          | Verify token
    |                          | Generate new accessToken
    |                          | (Optional) Rotate refreshToken
    |       200 OK             |
    | { accessToken: "..." }   |
    | Set-Cookie: refreshToken |
    |<-------------------------|
    |                          |
    | Continue with new token  |
```

### Failed Refresh (Expired Token)

```
Frontend                    Backend
    |                          |
    | POST /api/auth/refresh   |
    |------------------------->|
    |                          | Token invalid/expired
    |       401 Unauthorized   |
    | { message: "..." }       |
    | Set-Cookie: (clear)      |
    |<-------------------------|
    |                          |
    | Redirect to login        |
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Cookie not being sent

**Cause:** CORS not configured for credentials  
**Solution:**
```javascript
// Backend
res.header('Access-Control-Allow-Credentials', 'true');

// Frontend (already handled by apiFetch)
fetch(url, { credentials: 'include' });
```

### Issue 2: Cookie not visible in JavaScript

**Expected:** This is correct behavior (httpOnly)  
**Note:** Cookie is automatically sent by browser

### Issue 3: Cookie not working across subdomains

**Solution:** Set domain to `.agilabuscorp.me` (note the leading dot)

### Issue 4: Secure cookie fails in development

**Solution:** Disable secure flag in development:
```javascript
secure: process.env.NODE_ENV === 'production'
```

---

## 📝 API Response Examples

### Successful Login

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MjM5OTIyfQ.signature",
  "user": {
    "id": "12345",
    "email": "test@example.com",
    "role": "admin",
    "name": "John Doe"
  }
}
```

**Headers:**
```http
Set-Cookie: refreshToken=<token>; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/; Domain=.agilabuscorp.me
```

### Successful Refresh

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Failed Authentication

```json
{
  "message": "Invalid or expired refresh token",
  "error": "INVALID_TOKEN"
}
```

---

## ✅ Verification Steps

After backend implementation:

1. **Test Login**
   - Login returns accessToken
   - refreshToken cookie is set
   - Cookie has correct flags

2. **Test Refresh**
   - POST /api/auth/refresh with cookie
   - Returns new accessToken
   - Cookie updated (if rotating)

3. **Test Logout**
   - POST /api/auth/logout
   - Cookie cleared
   - Returns success

4. **Test Expiration**
   - Wait for token expiry
   - Refresh should succeed
   - New accessToken returned

5. **Test Invalid Token**
   - Use invalid refreshToken
   - Returns 401
   - Cookie cleared

---

## 📞 Contact Points

**Frontend Team:** Ready to test once endpoints are available  
**Backend Team:** Implement endpoints per this specification  
**Testing:** Coordinate integration testing

---

**Status:** ⏳ Waiting for backend implementation

Once backend is ready, frontend will test the complete flow end-to-end.
