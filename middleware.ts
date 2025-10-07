import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, and auth routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/auth/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  console.log(`[Middleware] Checking access for: ${pathname}`)

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Create the session check URL
      const sessionUrl = new URL('/api/auth/session', request.url)
      
      // Call the session API with the same cookies
      const sessionResponse = await fetch(sessionUrl, {
        headers: {
          cookie: request.headers.get('cookie') || '',
          'user-agent': request.headers.get('user-agent') || '',
        },
      })

      if (sessionResponse.ok) {
        const session = await sessionResponse.json()
        
        console.log(`[Middleware] Session check result:`, {
          hasUser: !!session?.user,
          email: session?.user?.email,
          role: session?.user?.role,
          expires: session?.expires
        })

        // Check if user has admin role
        if (session?.user?.role === 'admin') {
          console.log(`[Middleware] ✅ Access granted to ${pathname}`)
          return NextResponse.next()
        } else if (session?.user) {
          console.log(`[Middleware] ❌ User has role: ${session.user.role}, admin required`)
        } else {
          console.log(`[Middleware] ❌ No user in session`)
        }
      } else {
        console.log(`[Middleware] ❌ Session API returned: ${sessionResponse.status}`)
      }

      // Redirect to login with callback URL
      console.log(`[Middleware] 🔄 Redirecting to login`)
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)

    } catch (error) {
      console.error('[Middleware] ❌ Error checking session:', error)
      
      // On error, redirect to login for security
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|auth).*)',
  ],
}