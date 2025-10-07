import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    
    // Test 1: NextAuth session
    const session = await auth()
    
    // Test 2: JWT token
    const token = await getToken({ 
      req: request as any, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    // Test 3: Environment variables
    const envVars = {
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tests: {
        session: {
          exists: !!session,
          user: session?.user || null,
          expires: session?.expires || null
        },
        token: {
          exists: !!token,
          userId: token?.id || null,
          userRole: token?.role || null,
          email: token?.email || null,
          fullToken: token || null
        },
        environment: envVars,
        requestInfo: {
          url: url.href,
          pathname: url.pathname,
          headers: {
            userAgent: request.headers.get('user-agent'),
            cookie: request.headers.get('cookie') ? 'Present' : 'Missing'
          }
        }
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}