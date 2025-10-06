import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the request is for admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Get the session
    const session = await auth()

    // If no session, redirect to login
    if (!session?.user) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user has admin role
    if (session.user.role !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If accessing login page while authenticated, redirect to admin
  if (pathname === '/admin/login') {
    const session = await auth()
    if (session?.user?.role === 'admin') {
      const adminUrl = new URL('/admin', request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}