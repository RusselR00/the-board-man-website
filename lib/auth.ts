import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL environment variable')
}

if (!process.env.NEXTAUTH_SECRET) {
  console.error('Missing NEXTAUTH_SECRET environment variable')
}

// Set NEXTAUTH_URL based on environment
const getAuthUrl = () => {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  return process.env.NODE_ENV === 'production' 
    ? 'https://the-board-man-website.vercel.app'
    : 'http://localhost:3000'
}

const sql = neon(process.env.DATABASE_URL!)

declare module "next-auth" {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('NextAuth authorize called')
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials in NextAuth')
            return null
          }

          const email = credentials.email as string
          const password = credentials.password as string

          console.log('NextAuth: Attempting login for:', email)
          
          // Query the database for the user
          const users = await sql`
            SELECT id, email, password_hash, name, role
            FROM admin_users 
            WHERE email = ${email.toLowerCase()}
            LIMIT 1
          `

          console.log('NextAuth: Database query result:', users.length > 0 ? 'User found' : 'No user found')

          if (users.length === 0) {
            console.log('NextAuth: No user found with email:', email)
            return null
          }

          const user = users[0]
          console.log('NextAuth: Found user:', user.email, 'with role:', user.role)

          // Verify the password
          const isPasswordValid = await bcrypt.compare(password, user.password_hash)
          console.log('NextAuth: Password validation result:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('NextAuth: Invalid password for user:', email)
            return null
          }

          console.log('NextAuth: Login successful for:', email)
          
          // Return user object (will be stored in JWT)
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('NextAuth authorize error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
          })
          throw error // Re-throw to see the actual error
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      try {
        console.log('NextAuth JWT callback called with:', { hasUser: !!user, hasToken: !!token, hasAccount: !!account })
        
        if (user) {
          // First time login - add user data to token
          token.id = user.id
          token.role = user.role
          token.email = user.email
          token.name = user.name
          console.log('NextAuth: JWT token updated with user data:', { id: token.id, role: token.role, email: token.email })
        }
        
        return token
      } catch (error) {
        console.error('NextAuth JWT callback error:', error)
        return token // Return token even if there's an error to prevent auth failure
      }
    },
    async session({ session, token }) {
      try {
        console.log('NextAuth session callback called with:', { hasSession: !!session, hasToken: !!token })
        
        if (token && session.user) {
          // Add token data to session
          session.user.id = token.id as string
          session.user.role = token.role as string
          session.user.email = token.email as string
          session.user.name = token.name as string
          console.log('NextAuth: Session updated with token data:', { id: session.user.id, role: session.user.role })
        }
        
        return session
      } catch (error) {
        console.error('NextAuth session callback error:', error)
        return session // Return session even if there's an error
      }
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback:', { url, baseUrl })
      
      // Handle redirects after login
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      
      return `${baseUrl}/admin`
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  debug: true, // Enable debug mode in production
})