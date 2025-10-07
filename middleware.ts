import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  console.log(`[Middleware] ${request.method} ${pathname}`)

  // Check if the request is for admin routes (except auth routes)
  if (pathname.startsWith('/admin')) {
    try {
      // Use NextAuth to check for valid session
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: process.env.NODE_ENV === 'production' 
          ? '__Secure-nextauth.session-token' 
          : 'nextauth.session-token'
      })

      console.log(`[Middleware] Token for ${pathname}:`, {
        exists: !!token,
        role: token?.role,
        email: token?.email,
        id: token?.id
      })

      // If no valid token or not admin role, redirect to login
      if (!token || token.role !== 'admin') {
        console.log(`[Middleware] Redirecting to login - Token: ${!!token}, Role: ${token?.role}`)
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
      }

      console.log(`[Middleware] Access granted to ${pathname}`)
    } catch (error) {
      console.error('[Middleware] Error:', error)
      const loginUrl = new URL('/auth/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}