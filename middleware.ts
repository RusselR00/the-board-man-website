import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the request is for admin routes (except auth routes)
  if (pathname.startsWith('/admin')) {
    // Check if user has admin token cookie
    const adminToken = request.cookies.get('admin-token')

    // If no token, redirect to login
    if (!adminToken) {
      const loginUrl = new URL('/auth/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}