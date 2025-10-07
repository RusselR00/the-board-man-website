import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log(`[Middleware] ${request.method} ${pathname}`)

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Check for session by calling the session API
      const sessionResponse = await fetch(new URL('/api/auth/session', request.url), {
        headers: {
          cookie: request.headers.get('cookie') || ''
        }
      })

      if (sessionResponse.ok) {
        const session = await sessionResponse.json()
        
        console.log(`[Middleware] Session check for ${pathname}:`, {
          hasUser: !!session?.user,
          email: session?.user?.email,
          role: session?.user?.role
        })

        // If user exists and has admin role, allow access
        if (session?.user?.role === 'admin') {
          console.log(`[Middleware] Access granted to ${pathname}`)
          return NextResponse.next()
        }
      }

      console.log(`[Middleware] Redirecting to login - No valid admin session`)
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)

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