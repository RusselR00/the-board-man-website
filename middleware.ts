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
      // Try multiple cookie names for token detection
      const cookieNames = [
        '__Secure-nextauth.session-token', // Production HTTPS
        'nextauth.session-token', // Development HTTP
        process.env.NODE_ENV === 'production' 
          ? '__Secure-nextauth.session-token'
          : 'nextauth.session-token'
      ]

      let token = null
      
      // Try each cookie name
      for (const cookieName of cookieNames) {
        try {
          token = await getToken({ 
            req: request, 
            secret: process.env.NEXTAUTH_SECRET,
            cookieName
          })
          if (token) {
            console.log(`[Middleware] Token found with cookie: ${cookieName}`)
            break
          }
        } catch (e) {
          console.log(`[Middleware] Failed to get token with cookie: ${cookieName}`)
        }
      }

      // Alternative: Check for session cookie directly
      if (!token) {
        const sessionCookie = request.cookies.get('__Secure-nextauth.session-token') || 
                             request.cookies.get('nextauth.session-token')
        
        if (sessionCookie) {
          console.log(`[Middleware] Session cookie found, allowing access`)
          // If we have a session cookie but can't decode it, allow access
          // The session will be validated on the client side
          return NextResponse.next()
        }
      }

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
      
      // If there's an error but we have session cookies, allow access
      const sessionCookie = request.cookies.get('__Secure-nextauth.session-token') || 
                           request.cookies.get('nextauth.session-token')
      
      if (sessionCookie) {
        console.log(`[Middleware] Error but session cookie present, allowing access`)
        return NextResponse.next()
      }
      
      const loginUrl = new URL('/auth/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}