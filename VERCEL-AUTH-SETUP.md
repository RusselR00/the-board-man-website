# Vercel Authentication Setup Guide

## Current Issue Analysis
Your logs show authentication is working (200 responses), but there might be environment variable or configuration issues.

## Required Environment Variables in Vercel

### 1. Essential Variables
Go to your Vercel project → Settings → Environment Variables and ensure these are set:

```bash
# Database
DATABASE_URL=your_neon_database_url

# NextAuth
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=https://your-domain.vercel.app

# Email (if using contact form)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@your-domain.com
ADMIN_EMAIL=admin@your-domain.com

# App Config
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 2. Generate NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Common Issues & Solutions

### Issue 1: NEXTAUTH_SECRET Missing
- **Symptom**: Authentication fails silently
- **Solution**: Add `NEXTAUTH_SECRET` in Vercel environment variables

### Issue 2: NEXTAUTH_URL Mismatch
- **Symptom**: Redirects don't work properly
- **Solution**: Set `NEXTAUTH_URL` to your exact Vercel domain

### Issue 3: Database Connection
- **Symptom**: Login attempts fail
- **Solution**: Verify `DATABASE_URL` is correct and database is accessible

### Issue 4: Middleware Issues
- **Symptom**: Infinite redirects or access denied
- **Solution**: Check middleware configuration

## Verification Steps

### 1. Test Database Connection
Create a test API route to verify database connectivity:

```typescript
// app/api/test-db/route.ts
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const result = await sql`SELECT 1 as test`
    return Response.json({ success: true, data: result })
  } catch (error) {
    return Response.json({ success: false, error: error.message })
  }
}
```

### 2. Test Authentication
Visit these URLs to test:
- `https://your-domain.vercel.app/api/auth/providers`
- `https://your-domain.vercel.app/api/auth/session`
- `https://your-domain.vercel.app/auth/login`

### 3. Check Logs
Monitor Vercel function logs for any errors:
- Go to Vercel Dashboard → Functions tab
- Check for any error logs during authentication

## Current Authentication Flow

1. User visits `/admin` → Middleware redirects to `/auth/login`
2. User submits login form → POST to `/api/auth/callback/credentials`
3. NextAuth validates credentials → Creates session
4. User redirected back to `/admin` → Middleware allows access

## Environment Variables Checklist

- [ ] `DATABASE_URL` - Neon database connection string
- [ ] `NEXTAUTH_SECRET` - Random secret for JWT signing
- [ ] `NEXTAUTH_URL` - Your Vercel domain
- [ ] `NEXT_PUBLIC_BASE_URL` - Your Vercel domain (for client-side)

## Deployment Checklist

1. **Build Success**: Ensure `npm run build` works locally
2. **Environment Variables**: All required vars set in Vercel
3. **Database**: Tables created and admin user exists
4. **Domain**: NEXTAUTH_URL matches your Vercel domain exactly

## Debug Mode

Your auth config has `debug: true` enabled, which will show detailed logs in Vercel functions. Check the function logs for authentication flow details.

## Admin User Setup

Ensure you have an admin user in your database:

```sql
INSERT INTO admin_users (email, password_hash, name, role, created_at)
VALUES (
  'admin@yourdomain.com',
  '$2a$12$your_bcrypt_hash_here',
  'Admin User',
  'admin',
  NOW()
);
```

Use the `/api/admin/test-user` endpoint to create the admin user if needed.